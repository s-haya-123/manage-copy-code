<script lang="ts">
	import List, { Item, Separator, Text } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import Textfield from '@smui/textfield';
	import VerticalList from '$lib/VerticalList.svelte';
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import { copyCodeTable } from '$lib/store/copyCode';

	let registerText = '';
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>新規登録</Title>
			<Textfield
				type="text"
				bind:value={registerText}
				updateInvalid
				label="タイトル"
				style="width: 100%;"
			></Textfield>
		</Paper>
	</div>
	<div class="item">
		<Paper>
			<Title>履歴</Title>
			<Content>
				<List class="demo-list">
					<Separator />
					{#each $copyCodeTable as code}
						<Item><a href={`/detail/${code.id}`} class="item">{code.tableName}</a></Item>
					{/each}
					<Item
						on:click={() => {
							copyCodeTable.insert('test');
						}}>パンドラのコード</Item
					>
				</List>
			</Content>
		</Paper>
	</div>
</VerticalList>

<style>
	.item {
		width: 100%;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
