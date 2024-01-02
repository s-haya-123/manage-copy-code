<script lang="ts">
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import VerticalList from '$lib/VerticalList.svelte';
	import List, { Separator, Item } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';

	export let data;

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
	};
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>{data.title}</Title>
			<Content>
				<List class="demo-list">
					<Separator />
					{#each data.codes as code}
						<Item on:SMUI:action={copyCode(code.value)}>{code.value}</Item>
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
