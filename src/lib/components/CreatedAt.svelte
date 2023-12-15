<script lang="ts">
	import Clock from './Svg/outline/Clock.svelte';

	export let timestamp: string;
</script>

<div class="flex item-center gap-x-1">
	<Clock />

	<time class="text-sm">
		{new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' })}
	</time>
</div>
