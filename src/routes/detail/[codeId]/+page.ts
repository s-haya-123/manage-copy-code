import { error } from '@sveltejs/kit';

export function load({ params: { codeId } }: { params: { codeId: string } }) {
	return {
		codeId
	};

	error(404, 'Not found');
}
