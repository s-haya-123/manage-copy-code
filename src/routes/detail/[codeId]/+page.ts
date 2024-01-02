import { error } from '@sveltejs/kit';

export function load({ params: { codeId } }: { params: { codeId: string } }) {
	if (codeId) {
		return {
			codeId
		};
	} else {
		error(404, 'Not found');
	}
}
