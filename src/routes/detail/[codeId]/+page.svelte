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
	import Button, { Label } from '@smui/button';

	export let data;

	let tableName: string = '';
	let copyCodes: CopyCode[] = [];
	let copyCodeStore: ReturnType<typeof createCopyCodeStore> | undefined;
	let subscribe: Unsubscriber | undefined;

	if (Number.isInteger(Number(data.codeId))) {
		copyCodeStore = createCopyCodeStore(Number(data.codeId))
		subscribe = copyCodeStore.subscribe((store) => {
			copyCodes = store;
		});
	}

	copyCodeTable.subscribe((table) => {
		tableName = table.find((t) => `${t.id}` === data.codeId)?.tableName ?? '';
	});

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
	};
	const registerCopyCode = async () => {
		if(!copyCodeStore) return;
		const code = await navigator.clipboard.readText();
		copyCodeStore.insert({
			code,
			tableId: Number(data.codeId),
			date: new Date().toISOString()
		});
	}

	onDestroy(() => {
		subscribe?.();
	});
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<div class="title">
				<Title>{tableName}</Title>
				<Button on:click={registerCopyCode} variant="raised">
					<Label>コピーしたコードの登録</Label>
				</Button>
			</div>
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
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
	}
</style>
