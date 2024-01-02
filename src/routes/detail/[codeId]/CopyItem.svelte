<script lang="ts">
	import { Item } from '@smui/list';
	import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';

	export let copyText: string;
	let snackbarWithClose: Snackbar;

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
		snackbarWithClose.open();
	};
</script>

<Snackbar bind:this={snackbarWithClose}>
	<SnackbarLabel>コピーしました: {copyText}</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
<Item on:SMUI:action={copyCode(copyText)}>{copyText}</Item>
