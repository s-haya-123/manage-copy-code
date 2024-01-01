import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: { codeId: string } }) {
	if (params.codeId === '1') {
		return {
			codeId: 'test'
		};
	}

	error(404, 'Not found');
}
