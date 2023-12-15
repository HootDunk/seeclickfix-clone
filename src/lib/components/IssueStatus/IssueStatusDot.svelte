<script lang="ts" context="module">
	const statusToColorMap = {
		Open: 'rgb(240, 109, 0)',
		Closed: 'rgb(11, 153, 203)',
		Acknowledged: 'rgb(150, 222, 150)',
		Archived: 'rgb(95, 95, 95)'
	};
</script>

<script lang="ts">
	import type { Issue } from '$lib/services/SeeClickFix/SeeClickFixService';
	export let status: Issue['status'];
</script>

<span style="--status-color: {statusToColorMap[status]};" class={status.toLowerCase()} />

<style>
	span {
		background-color: var(--status-color);
		border-bottom-color: rgb(255, 255, 255);
		border-bottom-left-radius: 3.35544e7px;
		border-bottom-right-radius: 3.35544e7px;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-image-outset: 0;
		border-image-repeat: stretch;
		border-image-slice: 100%;
		border-image-source: none;
		border-image-width: 1;
		border-left-color: rgb(255, 255, 255);
		border-left-style: solid;
		border-left-width: 1px;
		border-right-color: rgb(255, 255, 255);
		border-right-style: solid;
		border-right-width: 1px;
		border-top-color: rgb(255, 255, 255);
		border-top-left-radius: 3.35544e7px;
		border-top-right-radius: 3.35544e7px;
		border-top-style: solid;
		border-top-width: 1px;
		box-shadow:
			rgba(8, 4, 1, 0.08) 0px 0px 5px 0px,
			rgba(8, 4, 1, 0.2) 0px 0px 5px 0px;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		display: inline-block;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		height: 18px;
		padding-bottom: 8px;
		padding-left: 8px;
		padding-right: 8px;
		padding-top: 8px;
		text-rendering: optimizelegibility;

		transition-delay: 0s;
		transition-duration: 0.5s;
		transition-property: box-shadow;
		transition-timing-function: ease;
		width: 18px;
		-webkit-font-smoothing: antialiased;
	}
</style>
