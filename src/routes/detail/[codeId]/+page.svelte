<script lang="ts">
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import VerticalList from '$lib/VerticalList.svelte';
	import { createCopyCodeStore } from '$lib/store/copyCode.js';
	import List, { Separator } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import { copyCodeTable } from '$lib/store/copyCode';
	import type { CopyCode } from '$lib/indexedDb/copyCodeDb.js';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';
	import CopyItem from './CopyItem.svelte';
	import RegisterButton from './RegisterButton.svelte';


	export let data;

	let tableName: string = '';
	let copyCodes: CopyCode[] = [];
	let copyCodeStore: ReturnType<typeof createCopyCodeStore> | undefined;
	let subscribe: Unsubscriber | undefined;

	if (Number.isInteger(Number(data.codeId))) {
		copyCodeStore = createCopyCodeStore(Number(data.codeId));
		subscribe = copyCodeStore.subscribe((store) => {
			copyCodes = store;
		});
	}

	copyCodeTable.subscribe((table) => {
		tableName = table.find((t) => `${t.id}` === data.codeId)?.tableName ?? '';
	});

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
				<RegisterButton copyCodeStore={copyCodeStore} codeId={data.codeId} />
			</div>
			<Separator />
			<Content>
				<List>
					{#each copyCodes as value}
						<CopyItem copyText={value.code} />
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
