<script lang="ts">
	import Snackbar, { Label, Actions } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { onDestroy, onMount } from 'svelte';
	import { listen, type UnlistenFn } from '@tauri-apps/api/event';
	import { pathItem } from '$lib/store/pathStore';
	import { syncVrcWorld } from '$lib/store/syncVrcWorld';
	import { emit } from '@tauri-apps/api/event';
	import type { Unsubscriber } from 'svelte/store';
	let snackbarError: Snackbar;
	let errorText = '';
	let beforePath = '';

	let unsubscriber: Unsubscriber;
	let unlistenFn: UnlistenFn;

	onMount(async () => {
		unlistenFn = await listen('Err', (event) => {
			if ((event.payload as string).trim() === 'FileLoadError') {
				errorText = '指定したログファイルが存在しません';
				pathItem.resetPath();
				syncVrcWorld.syncStop();
				snackbarError.open();
			}
		});
		unsubscriber = pathItem.subscribe((path) => {
			if (!!path) {
				emit('tail', path + '/test.log');
				if (beforePath !== '') {
					errorText = '再起動が必要です';
					snackbarError.open();
				}
			}
			beforePath = path;
		});
	});
	onDestroy(() => {
		unlistenFn();
		unsubscriber();
	});
</script>

<Snackbar bind:this={snackbarError} class="demo-error">
	<Label>{errorText}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
