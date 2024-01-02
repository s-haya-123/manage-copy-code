<script lang="ts">
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import VerticalList from '$lib/VerticalList.svelte';
	import { createCopyCodeStore } from '$lib/store/copyCode.js';
	import List, { Separator, Item } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import { copyCodeTable } from '$lib/store/copyCode';

	export let data;

	let tableName: string = "";

	const copyCodeStore = createCopyCodeStore(data.codeId);

	copyCodeTable.subscribe((table) => {
		tableName = table.find((t) => `${t.id}` === data.codeId)?.tableName ?? '';
	});

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
	};
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>{tableName}</Title>
			<Content>
				<List class="demo-list">
					<Separator />
					{#each $copyCodeStore as value}
						<Item on:SMUI:action={copyCode(value.code)}>{value.code}</Item>
					{/each}
				</List>
			</Content>
		</Paper>
	</div>
</VerticalList>

<style>
	.item {
		width: 100%;
	}
</style>
