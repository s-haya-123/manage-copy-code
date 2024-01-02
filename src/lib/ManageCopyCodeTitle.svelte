<script lang="ts">
	import TopAppBar, { Row, Section, Title as BarTitle } from '@smui/top-app-bar';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Unsubscriber } from 'svelte/motion';
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import { goto } from '$app/navigation';

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

<TopAppBar variant="static" color="primary">
	<Row>
		{#if !isTop}
			<Section>
				<IconButton
					class="material-icons"
					on:click={() => {
						goto('/');
					}}
				>
					arrow_back
				</IconButton>
			</Section>
		{:else}
			<Section>
                <!-- スタイルが崩れるので空のボタンを置いている -->
				<IconButton
                disabled
                />
            </Section>
		{/if}
		<Section>
			<BarTitle>セーブデータ管理</BarTitle>
		</Section>
	</Row>
</TopAppBar>
