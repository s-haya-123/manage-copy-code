<script lang="ts">
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import SyncOff from 'svelte-material-icons/SyncOff.svelte';
	import Sync from 'svelte-material-icons/Sync.svelte';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import { syncVrcWorld } from '$lib/store/syncVrcWorld';
	import { isTauri } from '$lib/isTauri';
	import { open } from '@tauri-apps/api/dialog';
	import { pathItem } from '$lib/store/pathStore';
	import { onDestroy } from 'svelte';

	const fileOpen = async () => {
		return (await open({
			multiple: false,
			directory: true
		})) as string | undefined;
	};

	let unsubscriber = syncVrcWorld.subscribe(async (value) => {
		if (!isTauri()) {
			return;
		}
		if (value.mode === 'prepare') {
			const path = await fileOpen();
			if (path) {
				pathItem.updatePath(path);
			}
		}
	});
	onDestroy(unsubscriber);
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
