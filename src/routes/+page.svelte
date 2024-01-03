<script lang="ts">
	import List, { Item, Separator } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import Textfield from '@smui/textfield';
	import VerticalList from '$lib/VerticalList.svelte';
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import { open } from '@tauri-apps/api/dialog';
	import { emit, listen } from '@tauri-apps/api/event'
	import { onMount } from 'svelte';
	import { isTauri } from '$lib/isTauri';

	let registeredText = '';

	const fileOpenTest = async () =>{
		if(!isTauri()) {
			return;
		}
		const selected = await open({
			multiple: false,
			directory: true
		});
		emit("tail", selected+'/test.log');
	}
	onMount(async ()=>{
		await listen('World', event => {
        console.log(`World ${event.payload} ${new Date()}`)
      });
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			fileOpenTest();
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
					<!-- {#each $copyCodeTable as code}
						<Item
							on:click={() => {
								goto(`/detail/${code.id}`);
							}}
							>{code.tableName}
						</Item>
					{/each} -->
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
