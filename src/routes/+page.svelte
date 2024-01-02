<script lang="ts">
	import List, { Item, Separator } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import Textfield from '@smui/textfield';
	import VerticalList from '$lib/VerticalList.svelte';
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import { copyCodeTable, initializeCopyCodeDb } from '$lib/store/copyCode';
	import { goto } from '$app/navigation';

	let registeredText = '';

	const register = async () => {
		if (registeredText === '') return;
		Promise.all([copyCodeTable.insert(registeredText), navigator.clipboard.readText()]).then(
			([tableId, code]) => {
				initializeCopyCodeDb({
					tableId,
					code,
					date: new Date().toISOString()
				});
				goto(`/detail/${tableId}`);
			}
		);
	};
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			register();
		}
	}}
/>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>新規登録(Enterで登録)</Title>
			<Textfield
				type="text"
				bind:value={registeredText}
				updateInvalid
				label="タイトル"
				style="width: 100%;"
			></Textfield>
		</Paper>
	</div>
	<div class="item">
		<Paper>
			<Title>一覧</Title>
			<Content>
				<List class="demo-list">
					<Separator />
					{#each $copyCodeTable as code}
						<Item
							on:click={() => {
								goto(`/detail/${code.id}`);
							}}
							>{code.tableName}
						</Item>
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
