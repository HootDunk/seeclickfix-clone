<script lang="ts">
	import Funnel from '$lib/components/Svg/outline/Funnel.svelte';
	import Bars3 from '$lib/components/Svg/Bars3.svelte';
</script>

<div class="wrapper">
	<header>
		<h1>Fayetteville, AR</h1>
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
		color: hsl(var(--primary-content));
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

	:global() {
		--header-height: 4rem;
	}
</style>
