<script lang="ts">
	import Snackbar, { Label, Actions } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { onMount } from 'svelte';
	import { listen } from '@tauri-apps/api/event';
	import { pathItem } from '$lib/store/pathStore';
	import { syncVrcWorld } from '$lib/store/syncVrcWorld';
	let snackbarError: Snackbar;
	let errorText = '';

	onMount(async () => {
		await listen('Err', (event) => {
			if ((event.payload as string).trim() === 'FileLoadError') {
				errorText = '指定したログファイルが存在しません';
				pathItem.resetPath();
				syncVrcWorld.syncStop();
				snackbarError.open();
			}
		});
	});
</script>

<Snackbar bind:this={snackbarError} class="demo-error">
	<Label>{errorText}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
