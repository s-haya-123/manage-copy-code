<script lang="ts">
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import SyncOff from 'svelte-material-icons/SyncOff.svelte';
	import Sync from 'svelte-material-icons/Sync.svelte';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import { syncVrcWorld } from '$lib/store/syncVrcWorld';
</script>

<Wrapper>
	{#if $syncVrcWorld.isSync}
		<IconButton on:click={syncVrcWorld.syncStop}>
			<Sync />
		</IconButton>
		<Tooltip>ワールドの監視中。クリックで解除</Tooltip>
	{:else}
		<IconButton on:click={() => syncVrcWorld.syncStart('aa')}>
			<SyncOff />
		</IconButton>
		<Tooltip>クリックで監視開始</Tooltip>
	{/if}
</Wrapper>
