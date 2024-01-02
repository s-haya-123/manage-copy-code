<script lang="ts">
	export let gap = 20;
</script>

<div class="wrapper" style:gap={`${gap}px`}>
	<slot />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>
