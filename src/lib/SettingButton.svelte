<script>
	import Dialog, { Content, Title } from '@smui/dialog';
	import IconButton from '@smui/icon-button/src/IconButton.svelte';
	import Cog from 'svelte-material-icons/Cog.svelte';
	import File from 'svelte-material-icons/File.svelte';
	import { pathItem } from '$lib/store/pathStore';
	import { settingFilePath } from './settingFilePath';

	let open = false;

	const click = () => {
		open = true;
	};
	const changePath = () => {
		settingFilePath();
	};
</script>

<Dialog bind:open fullscreen aria-describedby="sheet-content">
	<Title>設定</Title>
	<Content id="sheet-content">
		<IconButton action="close" class="material-icons">close</IconButton>
		<div class="row">
			<div>
				{#if $pathItem !== ''}
					{$pathItem}
				{:else}
					パスが設定されていません
				{/if}
			</div>
			<IconButton on:click={changePath}>
				<div class="buttonColor">
					<File />
				</div>
			</IconButton>
		</div>
	</Content>
</Dialog>

<IconButton on:click={click}>
	<Cog />
</IconButton>

<style>
	.row {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.buttonColor {
		color: black;
	}
</style>
