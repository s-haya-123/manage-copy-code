import { error } from '@sveltejs/kit';

export function load({ params }: { params: { codeId: string } }) {
	console.log(params);
	return {
		title: 'パンドラのコード',
		codes: [
			{
				value: 'sample',
				date: '2021/01/01'
			},
			{
				value: 'sample2',
				date: '2021/01/02'
			},
			{
				value: 'sample3',
				date: '2021/01/03'
			}
		]
	};

	error(404, 'Not found');
}
