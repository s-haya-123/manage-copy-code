<script lang="ts">
	import TopAppBar, { Row, Section, Title as BarTitle } from '@smui/top-app-bar';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Unsubscriber } from 'svelte/motion';
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import { goto } from '$app/navigation';
	import SyncButton from '$lib/SyncButton.svelte';
	import SettingButton from '$lib/SettingButton.svelte';
	import FilePathListner from '$lib/FilePathListner.svelte';

	let isTop = true;
	let subscribe: Unsubscriber;

	onMount(() => {
		subscribe = page.subscribe((p) => {
			isTop = Object.keys(p.params).length === 0;
		});
	});
	onDestroy(() => {
		subscribe();
	});
</script>

<FilePathListner />

<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			{#if !isTop}
				<IconButton
					class="material-icons"
					on:click={() => {
						goto('/');
					}}
				>
					arrow_back
				</IconButton>
			{:else}
				<!-- スタイルが崩れるので空のボタンを置いている -->
				<IconButton disabled />
			{/if}
			<BarTitle>セーブデータ管理</BarTitle>
		</Section>
		<Section align="end">
			<SyncButton />
			<SettingButton />
		</Section>
	</Row>
</TopAppBar>
