<script lang="ts">
	import type { IssuesResponse } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { Button, Card } from 'stwui';
	import IssueStatusIndicator from '../IssueStatus/IssueStatusIndicator.svelte';
	import CreatedAt from '../CreatedAt.svelte';

	export let issue: IssuesResponse['issues'][0];
</script>

<Card>
	<div slot="content">
		{#if issue.media.image_full}
			<img
				src={issue.media.image_full}
				alt="cover"
				class="object-cover object-center w-full aspect-1 h-[300px]"
			/>
		{/if}
		<div class="issues-list-button-override space-y-1 p-4">
			<Button class="p-0" type="link" href="https://google.com">
				<h2>
					{issue.summary}
				</h2>
			</Button>
			<div class="truncate">{issue.address}</div>
			<div class="flex gap-4">
				<IssueStatusIndicator status={issue.status} />
				<CreatedAt timestamp={issue.created_at} />
			</div>
			<div class="truncate">
				{issue.description}
			</div>
		</div>
	</div>
</Card>

<style>
	.issues-list-button-override :global(.stwui-button-hover) {
		opacity: 0;
	}
</style>
