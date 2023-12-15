<script lang="ts">
</script>

<div class="layout-container">
	<aside class="side-content"><slot name="side-bar" /></aside>
	<div class="main-content"><slot name="main-content" /></div>
</div>

<style>
	.layout-container {
		display: flex;
		grid-template-columns: 400px auto;
	}

	.side-content {
		display: none;
	}

	aside {
		overflow-y: auto;
	}

	@media (min-width: 64rem) {
		.side-content {
			width: 400px;
			display: unset;
		}
	}
</style>
