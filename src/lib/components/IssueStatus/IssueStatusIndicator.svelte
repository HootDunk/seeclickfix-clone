<script lang="ts">
	import IssueStatusDot from './IssueStatusDot.svelte';
	import type { Issue } from '$lib/services/SeeClickFix/SeeClickFixService';

	export let status: Issue['status'];
</script>

<div class="flex items-center gap-2">
	<IssueStatusDot {status} />

	<span class="text-sm">
		{status}
	</span>
</div>
