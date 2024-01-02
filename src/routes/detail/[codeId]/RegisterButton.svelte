<script lang="ts">
	import Button, { Label } from '@smui/button';

	import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import type { createCopyCodeStore } from '$lib/store/copyCode';

	export let copyCodeStore: ReturnType<typeof createCopyCodeStore> | undefined;
	export let codeId: string;
	let snackbarWithClose: Snackbar;
	let text: string = '';

	const registerCopyCode = async () => {
		if (!copyCodeStore) return;
		const code = await navigator.clipboard.readText();
		copyCodeStore.insert({
			code,
			tableId: Number(codeId),
			date: new Date().toISOString()
		});

		text = code;
		snackbarWithClose.open();
	};
</script>

<Snackbar bind:this={snackbarWithClose}>
	<SnackbarLabel>登録しました: {text}</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>

<Button on:click={registerCopyCode} variant="raised">
	<Label>コピーしたコードの登録</Label>
</Button>
