<script lang="ts">
	import List, { Item, Separator, Text } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';
	import Textfield from '@smui/textfield';
	import VerticalList from '$lib/VerticalList.svelte';
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';

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
					<Item><a href="/detail/sample2" class="item">パンドラのコード</a></Item>
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
