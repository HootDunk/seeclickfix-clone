<script lang="ts">
	import '../app.pcss';
	import Funnel from '$lib/components/Svg/outline/Funnel.svelte';
	import Bars3 from '$lib/components/Svg/Bars3.svelte';
</script>

<div class="wrapper">
	<header>
		<h1>Fayetville, AR</h1>
		<div class="controls">
			<Funnel />
			<Bars3 />
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	.wrapper {
		--header-height: 4rem;
	}
	header {
		height: var(--header-height);
		/* color: hsl(var(--content)); */
		background-color: hsl(var(--primary));
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
	}
	.controls {
		display: flex;
		gap: 1rem;
	}

	main {
		height: calc(100vh - var(--header-height));
	}
</style>
