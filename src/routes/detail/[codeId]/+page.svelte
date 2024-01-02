<script lang="ts">
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import VerticalList from '$lib/VerticalList.svelte';
	import { createCopyCodeStore } from '$lib/store/copyCode.js';
	import List, { Separator, Item } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import { copyCodeTable } from '$lib/store/copyCode';
	import type { CopyCode } from '$lib/indexedDb/copyCodeDb.js';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';

	export let data;

	let tableName: string = '';
	let copyCodes: CopyCode[] = [];
	let subscribe: Unsubscriber | undefined;

	if (Number.isInteger(Number(data.codeId))) {
		subscribe = createCopyCodeStore(Number(data.codeId)).subscribe((store) => {
			copyCodes = store;
		});
	}

	copyCodeTable.subscribe((table) => {
		tableName = table.find((t) => `${t.id}` === data.codeId)?.tableName ?? '';
	});

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
	};

	onDestroy(() => {
		subscribe?.();
	});
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>{tableName}</Title>
			<Separator />
			<Content>
				<List>
					{#each copyCodes as value}
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
