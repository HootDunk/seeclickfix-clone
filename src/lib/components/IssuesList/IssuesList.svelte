<script lang="ts">
	import type { IssuesResponse } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { Card } from 'stwui';

	export let issuesResponse: IssuesResponse;
</script>

<ul>
	{#each issuesResponse.issues as item (item.id)}
		<li class="mb-4">
			<Card>
				<!-- <Card.Header slot="header">{item.summary}</Card.Header> -->

				<div slot="content">
					{item.summary}
					{#if item.media.image_full}
						<img
							src={item.media.image_full}
							alt="cover"
							class="object-cover object-center w-full aspect-1 h-[300px]"
						/>
					{/if}
					testing below img
				</div>
			</Card>
		</li>
	{/each}
</ul>
