<script lang="ts">
	import { Item } from '@smui/list';
	import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';

	export let copyText: string;
	export let date: string;
	let snackbarWithClose: Snackbar;

	const copyCode = (code: string) => () => {
		navigator.clipboard.writeText(code);
		snackbarWithClose.open();
	};
	function formatDate(dateString: string) {
        const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
	}
</script>

<Snackbar bind:this={snackbarWithClose}>
	<SnackbarLabel>コピーしました: {copyText}</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
<Item on:SMUI:action={copyCode(copyText)}>{formatDate(date)} : {copyText}</Item>
