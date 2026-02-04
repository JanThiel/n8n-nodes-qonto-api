#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function usage() {
	console.error(
		'Usage: node scripts/audit-qonto-postman.mjs <postman.json> [splitOutDir] [reportPath]',
	);
	process.exit(1);
}

const [, , postmanPathArg, splitOutArg, reportPathArg] = process.argv;
if (!postmanPathArg) usage();

const postmanPath = path.resolve(postmanPathArg);
const splitOutDir = path.resolve(splitOutArg || 'reports/qonto-postman-collections');
const reportPath = path.resolve(reportPathArg || 'reports/qonto-postman-audit.json');
const qontoNodePath = path.resolve('nodes/Qonto/Qonto.node.ts');

function readJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function sanitizeFileName(name) {
	return (
		String(name)
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 120) || 'collection'
	);
}

function normalizePathTemplate(rawPath) {
	if (!rawPath) return '';
	let p = String(rawPath).trim();

	p = p.replace(/^https?:\/\/[^/]+\/?/i, '');
	p = p.replace(/^\/+/, '');
	p = p.replace(/^v2\//, '');

	p = p
		.replace(/\$\{([^}]+)\}/g, ':$1')
		.replace(/\{\{([^}]+)\}\}/g, ':$1')
		.replace(/\/+/g, '/');

	// Keep Postman/Express style placeholders as :id
	p = p
		.split('/')
		.map((segment) => {
			if (!segment) return segment;
			if (segment.startsWith(':')) return segment;
			if (/^<.+>$/.test(segment)) return `:${segment.slice(1, -1)}`;
			return segment;
		})
		.join('/');

	return p.replace(/\/$/, '');
}

function canonicalizePathForMatch(pathTemplate) {
	return String(pathTemplate || '').replace(/:[^/]+/g, ':*');
}

function extractPathFromPostmanUrl(url) {
	if (!url) return '';
	if (typeof url === 'string') return normalizePathTemplate(url);

	if (Array.isArray(url.path) && url.path.length > 0) {
		return normalizePathTemplate(url.path.join('/'));
	}

	if (typeof url.raw === 'string') {
		const rawNoQuery = url.raw.split('?')[0];
		return normalizePathTemplate(rawNoQuery);
	}

	return '';
}

function flattenObjectKeys(obj, prefix = '', out = new Set()) {
	if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return out;
	for (const [k, v] of Object.entries(obj)) {
		const key = prefix ? `${prefix}.${k}` : k;
		out.add(key);
		if (v && typeof v === 'object' && !Array.isArray(v)) flattenObjectKeys(v, key, out);
	}
	return out;
}

function extractPostmanParams(request) {
	const params = {
		path: new Set(),
		query: new Set(),
		body: new Set(),
	};

	const url = request?.url;
	const pathTemplate = extractPathFromPostmanUrl(url);
	for (const seg of pathTemplate.split('/')) {
		if (seg.startsWith(':')) params.path.add(seg.slice(1));
	}

	const query = Array.isArray(url?.query) ? url.query : [];
	for (const q of query) {
		if (q && !q.disabled && typeof q.key === 'string' && q.key.trim())
			params.query.add(q.key.trim());
	}

	const body = request?.body;
	if (body && typeof body === 'object') {
		if (body.mode === 'raw' && typeof body.raw === 'string') {
			try {
				const parsed = JSON.parse(body.raw);
				flattenObjectKeys(parsed, '', params.body);
			} catch {
				// ignore non-JSON raw body
			}
		}

		if (Array.isArray(body.urlencoded)) {
			for (const entry of body.urlencoded) {
				if (entry && !entry.disabled && entry.key) params.body.add(String(entry.key));
			}
		}

		if (Array.isArray(body.formdata)) {
			for (const entry of body.formdata) {
				if (entry && !entry.disabled && entry.key) params.body.add(String(entry.key));
			}
		}
	}

	return params;
}

function collectPostmanRequests(collection) {
	const requests = [];

	function walk(items, breadcrumb = [], topCollection = '') {
		for (const item of items || []) {
			const name = item?.name || 'Unnamed';
			const nextTrail = [...breadcrumb, name];

			if (item?.request) {
				const method = item.request.method || 'GET';
				const pathTemplate = extractPathFromPostmanUrl(item.request.url);
				const params = extractPostmanParams(item.request);
				requests.push({
					topCollection,
					name,
					breadcrumb: nextTrail,
					method,
					pathTemplate,
					key: `${method} ${canonicalizePathForMatch(pathTemplate)}`,
					params,
				});
			}

			if (Array.isArray(item?.item)) {
				walk(item.item, nextTrail, topCollection);
			}
		}
	}

	for (const top of collection.item || []) {
		if (!top) continue;
		const topName = top.name || 'Unnamed';
		if (Array.isArray(top.item)) {
			walk(top.item, [topName], topName);
		} else if (top.request) {
			walk([top], [], topName);
		}
	}

	return requests;
}

function splitCollections(collection, outputDir) {
	fs.mkdirSync(outputDir, { recursive: true });

	const created = [];
	const topItems = collection.item || [];
	for (const top of topItems) {
		const name = top?.name || 'Unnamed';
		const fileName = `${sanitizeFileName(name)}.postman_collection.json`;
		const filePath = path.join(outputDir, fileName);

		const splitCollection = {
			...collection,
			info: {
				...(collection.info || {}),
				name: `${collection.info?.name || 'Qonto API'} :: ${name}`,
			},
			item: [top],
		};

		writeJson(filePath, splitCollection);
		created.push({ name, filePath });
	}

	return created;
}

function findMatchingBraceBlock(src, openBraceIndex) {
	let depth = 0;
	for (let i = openBraceIndex; i < src.length; i++) {
		if (src[i] === '{') depth++;
		if (src[i] === '}') {
			depth--;
			if (depth === 0) return src.slice(openBraceIndex, i + 1);
		}
	}
	return '';
}

function parseNodeOperations(sourceCode) {
	const operations = [];
	const resourceRegex = /if \(resource === '([^']+)'\) \{/g;

	for (const resourceMatch of sourceCode.matchAll(resourceRegex)) {
		const resource = resourceMatch[1];
		const resourceOpenBrace = sourceCode.indexOf('{', resourceMatch.index);
		const resourceBlock = findMatchingBraceBlock(sourceCode, resourceOpenBrace);
		if (!resourceBlock) continue;

		const opRegex = /if \(operation === '([^']+)'\) \{/g;
		for (const opMatch of resourceBlock.matchAll(opRegex)) {
			const operation = opMatch[1];
			const opStart = opMatch.index;
			const opOpenBrace = resourceBlock.indexOf('{', opStart);
			const opBlock = findMatchingBraceBlock(resourceBlock, opOpenBrace);
			if (!opBlock) continue;

			const endpointMatch =
				opBlock.match(/const endpoint\s*=\s*`([^`]+)`/) ||
				opBlock.match(/const endpoint\s*=\s*'([^']+)'/);
			const endpointRaw = endpointMatch ? endpointMatch[1] : '';
			const pathTemplate = normalizePathTemplate(endpointRaw);

			const methods = [
				...opBlock.matchAll(/qontoApiRequest\.call\(\s*this,\s*headers,\s*'([A-Z]+)'/gs),
				...opBlock.matchAll(/handleListing\.call\(\s*this,\s*headers,\s*'([A-Z]+)'/gs),
			].map((m) => m[1]);

			const method = methods[0] || 'GET';

			const nodeParams = new Set();
			for (const m of opBlock.matchAll(/getNodeParameter\('([^']+)'/g)) {
				nodeParams.add(m[1]);
			}

			const queryParams = new Set();
			for (const m of opBlock.matchAll(/query(?:\[['"]([^'"]+)['"]\]|\.([a-zA-Z0-9_]+))/g)) {
				queryParams.add(m[1] || m[2]);
			}

			const bodyApiParams = new Set();
			for (const m of opBlock.matchAll(
				/([a-zA-Z0-9_]+)\s*:\s*this\.getNodeParameter\('([^']+)'/g,
			)) {
				bodyApiParams.add(m[1]);
				nodeParams.add(m[2]);
			}

			const pathParams = new Set();
			for (const seg of pathTemplate.split('/')) {
				if (seg.startsWith(':')) pathParams.add(seg.slice(1));
			}

			operations.push({
				resource,
				operation,
				method,
				pathTemplate,
				key: `${method} ${canonicalizePathForMatch(pathTemplate)}`,
				endpointRaw,
				params: {
					node: [...nodeParams],
					path: [...pathParams],
					query: [...queryParams],
					bodyApi: [...bodyApiParams],
				},
			});
		}
	}

	return operations;
}

function toSet(arrayLike) {
	return new Set(Array.isArray(arrayLike) ? arrayLike : []);
}

function diffSet(a, b) {
	const out = [];
	for (const v of a) {
		if (!b.has(v)) out.push(v);
	}
	return out.sort();
}

function comparableParamName(key) {
	if (!key) return '';
	let value = String(key).trim();
	// filter[foo][] -> foo
	value = value.replace(/^filter\[([^\]]+)\](\[\])?$/, '$1');
	// statuses[] -> statuses
	value = value.replace(/\[\]$/, '');
	// payment_methods.iban -> iban
	if (value.includes('.')) value = value.split('.').pop();
	return value;
}

function createAudit(postmanRequests, nodeOps) {
	const ignoreCodeOnlyNodeParams = new Set([
		'authentication',
		'resource',
		'operation',
		'returnAll',
		'limit',
		'filters',
		'idempotency_key',
	]);

	const byPostmanKey = new Map();
	for (const req of postmanRequests) {
		if (!byPostmanKey.has(req.key)) byPostmanKey.set(req.key, []);
		byPostmanKey.get(req.key).push(req);
	}

	const byNodeKey = new Map();
	for (const op of nodeOps) {
		if (!byNodeKey.has(op.key)) byNodeKey.set(op.key, []);
		byNodeKey.get(op.key).push(op);
	}

	const missingInNode = [];
	for (const req of postmanRequests) {
		if (!byNodeKey.has(req.key)) {
			missingInNode.push({
				method: req.method,
				pathTemplate: req.pathTemplate,
				postmanCollection: req.topCollection,
				postmanRequest: req.name,
			});
		}
	}

	const notInPostman = [];
	for (const op of nodeOps) {
		if (!byPostmanKey.has(op.key)) {
			notInPostman.push({
				resource: op.resource,
				operation: op.operation,
				method: op.method,
				pathTemplate: op.pathTemplate,
			});
		}
	}

	const matched = [];
	for (const op of nodeOps) {
		const candidates = byPostmanKey.get(op.key) || [];
		if (candidates.length === 0) continue;
		const req = candidates[0];

		const postmanParams = toSet([...req.params.path, ...req.params.query, ...req.params.body]);

		const codeApiParams = toSet([...op.params.path, ...op.params.query, ...op.params.bodyApi]);

		const codeNodeParams = toSet(op.params.node.filter((p) => !ignoreCodeOnlyNodeParams.has(p)));

		const postmanPathQuery = toSet([...req.params.path, ...req.params.query]);
		const postmanQuery = toSet([...req.params.query]);
		const codeQuery = toSet([...op.params.query]);
		const missingQueryParamsInCode = diffSet(postmanQuery, codeQuery);
		const pathParamCountMismatch =
			req.params.path.size !== op.params.path.length
				? { postman: req.params.path.size, code: op.params.path.length }
				: null;

		const postmanBodyComparable = toSet(
			[...req.params.body].map(comparableParamName).filter(Boolean),
		);
		const codeComparable = toSet(
			[...codeApiParams, ...codeNodeParams].map(comparableParamName).filter(Boolean),
		);
		const likelyMissingBodyInputs = diffSet(postmanBodyComparable, codeComparable);

		const missingApiParamsInCode = diffSet(postmanParams, codeApiParams);
		const extraApiParamsInCode = diffSet(codeApiParams, postmanParams);

		matched.push({
			resource: op.resource,
			operation: op.operation,
			key: op.key,
			displayKey: `${op.method} ${op.pathTemplate}`,
			postmanCollection: req.topCollection,
			postmanRequest: req.name,
			missingQueryParamsInCode,
			pathParamCountMismatch,
			likelyMissingBodyInputs,
			missingApiParamsInCode,
			extraApiParamsInCode,
			postmanParams: [...postmanParams].sort(),
			codeApiParams: [...codeApiParams].sort(),
			codeNodeParams: [...codeNodeParams].sort(),
		});
	}

	const collectionsSummary = {};
	for (const req of postmanRequests) {
		collectionsSummary[req.topCollection] = (collectionsSummary[req.topCollection] || 0) + 1;
	}

	return {
		generatedAt: new Date().toISOString(),
		stats: {
			postmanRequests: postmanRequests.length,
			nodeOperations: nodeOps.length,
			matchedOperations: matched.length,
			missingInNode: missingInNode.length,
			notInPostman: notInPostman.length,
		},
		collectionsSummary,
		missingInNode,
		notInPostman,
		matched,
	};
}

function writeMarkdownReport(reportJsonPath, markdownPath) {
	const report = readJson(reportJsonPath);

	const lines = [];
	lines.push('# Qonto Postman vs n8n Node Audit');
	lines.push('');
	lines.push(`Generated: ${report.generatedAt}`);
	lines.push('');
	lines.push('## Stats');
	lines.push('');
	lines.push(`- Postman requests: ${report.stats.postmanRequests}`);
	lines.push(`- Node operations: ${report.stats.nodeOperations}`);
	lines.push(`- Matched operations by method/path: ${report.stats.matchedOperations}`);
	lines.push(`- Postman requests missing in node: ${report.stats.missingInNode}`);
	lines.push(`- Node operations without matching Postman request: ${report.stats.notInPostman}`);
	lines.push('');

	lines.push('## Collections');
	lines.push('');
	const collections = Object.entries(report.collectionsSummary).sort((a, b) => b[1] - a[1]);
	for (const [name, count] of collections) lines.push(`- ${name}: ${count}`);
	lines.push('');

	lines.push('## Missing in Node (Top 50)');
	lines.push('');
	for (const item of report.missingInNode.slice(0, 50)) {
		lines.push(
			`- ${item.method} ${item.pathTemplate} (${item.postmanCollection} -> ${item.postmanRequest})`,
		);
	}
	if (report.missingInNode.length > 50)
		lines.push(`- ... ${report.missingInNode.length - 50} more`);
	lines.push('');

	const paramIssues = report.matched.filter(
		(m) =>
			m.missingQueryParamsInCode.length > 0 ||
			m.likelyMissingBodyInputs.length > 0 ||
			Boolean(m.pathParamCountMismatch),
	);
	lines.push('## Parameter Mismatches (Top 50)');
	lines.push('');
	for (const item of paramIssues.slice(0, 50)) {
		lines.push(`- ${item.displayKey} / ${item.resource}.${item.operation}`);
		if (item.pathParamCountMismatch) {
			lines.push(
				`  - Path params count mismatch (postman=${item.pathParamCountMismatch.postman}, code=${item.pathParamCountMismatch.code})`,
			);
		}
		if (item.missingQueryParamsInCode.length) {
			lines.push(`  - Missing query params in code: ${item.missingQueryParamsInCode.join(', ')}`);
		}
		if (item.likelyMissingBodyInputs.length) {
			lines.push(`  - Likely missing body inputs: ${item.likelyMissingBodyInputs.join(', ')}`);
		}
	}
	if (paramIssues.length > 50) lines.push(`- ... ${paramIssues.length - 50} more`);
	lines.push('');

	fs.writeFileSync(markdownPath, lines.join('\n'));
}

const postman = readJson(postmanPath);
const splitCollectionsInfo = splitCollections(postman, splitOutDir);
const postmanRequests = collectPostmanRequests(postman);
const source = fs.readFileSync(qontoNodePath, 'utf8');
const nodeOperations = parseNodeOperations(source);
const audit = createAudit(postmanRequests, nodeOperations);

writeJson(reportPath, audit);
const mdPath = reportPath.replace(/\.json$/i, '.md');
writeMarkdownReport(reportPath, mdPath);

console.log(`Split collections written: ${splitCollectionsInfo.length} -> ${splitOutDir}`);
console.log(`Audit JSON: ${reportPath}`);
console.log(`Audit Markdown: ${mdPath}`);
console.log(`Stats: ${JSON.stringify(audit.stats)}`);
