<script lang="ts">
	import type { IssuesResponse } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { Button, Card, Chip, Icon } from 'stwui';
	import IssueStatusIndicator from '../IssueStatus/IssueStatusIndicator.svelte';
	import Clock, { clockSvg } from '../Svg/outline/Clock.svelte';
	import CreatedAt from '../CreatedAt.svelte';

	export let issuesResponse: IssuesResponse;
	// todo use grid for all items in content div
</script>

<ul class="mx-4">
	{#each issuesResponse.issues as item (item.id)}
		<li class="mb-4">
			<Card>
				<div slot="content">
					{#if item.media.image_full}
						<img
							src={item.media.image_full}
							alt="cover"
							class="object-cover object-center w-full aspect-1 h-[300px]"
						/>
					{/if}
					<div class="issues-list-button-override space-y-1 p-4">
						<Button class="p-0" type="link" href="https://google.com">
							<h2>
								{item.summary}
							</h2>
						</Button>
						<div class="truncate">{item.address}</div>
						<div class="flex gap-4">
							<IssueStatusIndicator status={item.status} />
							<CreatedAt timestamp={item.created_at} />
						</div>
						<div class="truncate">
							{item.description}
						</div>
					</div>
				</div>
			</Card>
		</li>
	{/each}
</ul>

<style>
	.issues-list-button-override :global(.stwui-button-hover) {
		opacity: 0;
	}
</style>
