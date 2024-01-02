<script>
	import ManageCopyCodeTitle from '$lib/ManageCopyCodeTitle.svelte';
	import VerticalList from '$lib/VerticalList.svelte';
	import List, { Separator, Item } from '@smui/list';
	import Paper, { Title, Content } from '@smui/paper';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<VerticalList gap={30}>
	<ManageCopyCodeTitle />
	<div class="item">
		<Paper>
			<Title>{data.title}</Title>
		</Paper>
	</div>
	<div class="item">
		<Paper>
			<Title>一覧</Title>
			<Content>
				<List class="demo-list">
					<Separator />
					{#each data.codes as code}
						<Item on:SMUI:action={() => {}}>{code.value}</Item>
					{/each}
				</List>
			</Content>
		</Paper>
	</div>
</VerticalList>
