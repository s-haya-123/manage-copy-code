<script lang="ts">
	import EllipseText from '$lib/EllipseText.svelte';
	import { onMount } from 'svelte';

	let copyText: string = '';

	const maskString = (str: string, numVisibleChars: number) => 
        str.substring(0, numVisibleChars) 
            + '*'.repeat(Math.max(0, str.length - numVisibleChars));
		

    const changeCopyText = async () => {
        copyText = maskString(await navigator.clipboard.readText(), 5);
    };
    onMount(changeCopyText);
</script>

<svelte:window
    on:copy={changeCopyText}
    on:focus={changeCopyText}
/>

<div class="wrapper">
	<div>clipboardの内容</div>
	{#if copyText === ''}
		<div>clipboardに何も入っていません</div>
	{:else}
		<EllipseText>
			{copyText}
		</EllipseText>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>
