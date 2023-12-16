<script lang="ts">
	import type { IssuesResponse } from '$lib/services/SeeClickFix/SeeClickFixService';
	import IssueCard from './IssueCard.svelte';

	export let issuesResponse: IssuesResponse;
</script>

<ul class="mx-4">
	{#each issuesResponse.issues as issue (issue.id)}
		<li class="mb-4">
			<IssueCard {issue} />
		</li>
	{/each}
</ul>
