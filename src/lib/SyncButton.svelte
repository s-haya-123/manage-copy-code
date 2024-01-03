<script lang="ts">
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import SyncOff from 'svelte-material-icons/SyncOff.svelte';
	import Sync from 'svelte-material-icons/Sync.svelte';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import { syncVrcWorld } from '$lib/store/syncVrcWorld';
	import { isTauri } from '$lib/isTauri';
	import { onDestroy, onMount } from 'svelte';
	import type { CopyCodeTable } from '$lib/indexedDb/copyCodeTable';
	import { copyCodeTable } from '$lib/store/dbAccessStore';
	import { goto } from '$app/navigation';
	import { listen, type UnlistenFn } from '@tauri-apps/api/event';
	import { settingFilePath } from '$lib/settingFilePath';

	let copyCodeTables: CopyCodeTable[] = [];

	let unsubscriber = syncVrcWorld.subscribe(async (value) => {
		if (!isTauri()) {
			return;
		}
		if (value.mode === 'prepare') {
			settingFilePath();
		}
	});
	let unsubscriber2 = copyCodeTable.subscribe((value) => {
		copyCodeTables = value;
	});
	let unlistenFn: UnlistenFn;

	const grepWorldFromRegisteredList = (worldName: string, list: CopyCodeTable[]) => {
		return list.find((copyCode) => copyCode.tableName === worldName);
	};

	onMount(async () => {
		unlistenFn = await listen('World', (event) => {
			const copyCodeTable = grepWorldFromRegisteredList(
				(event.payload as string).trim(),
				copyCodeTables
			);
			if (copyCodeTable) {
				goto(`/detail/${copyCodeTable.id}`);
			}
		});
	});
	onDestroy(() => {
		unsubscriber();
		unsubscriber2();
		unlistenFn();
	});
</script>

<Wrapper>
	{#if $syncVrcWorld.mode === 'sync'}
		<IconButton on:click={syncVrcWorld.syncStop}>
			<Sync />
		</IconButton>
		<Tooltip>ワールドの監視中。クリックで解除</Tooltip>
	{:else}
		<IconButton on:click={syncVrcWorld.syncStart} disabled={$syncVrcWorld.mode === 'prepare'}>
			<SyncOff />
		</IconButton>
		<Tooltip>クリックで監視開始</Tooltip>
	{/if}
</Wrapper>
