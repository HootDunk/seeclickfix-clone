<script lang="ts">
	import type { IssueWithDetails } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { Button, Icon } from 'stwui';

	import CreatedAt from '../CreatedAt.svelte';
	import IssueStatusIndicator from '../IssueStatus/IssueStatusIndicator.svelte';
	import IssueDetailsSection from './IssueDetailsSection.svelte';
	import { chevronLeftSvg } from '../Svg/outline/ChevronLeft.svelte';
	import { eyeSvg } from '../Svg/outline/Eye.svelte';
	import Clipboard from '../Svg/outline/Clipboard.svelte';
	import UserCircle from '../Svg/outline/UserCircle.svelte';
	import IconWithText from './IconWithText.svelte';

	import BuildingOffice2, { buildingOffice2Svg } from '../Svg/outline/BuildingOffice2.svelte';

	export let issue: IssueWithDetails;
</script>

<div>
	<div class="flex justify-between">
		<!-- todo change to link and watch changes in page store to update the href based on URLParams -->
		<div class="flex items-center">
			<Button on:click={() => history.back()}>
				<Button.Leading data={chevronLeftSvg} slot="leading" />
				Back to Results
			</Button>
		</div>
	</div>
	{#if issue.media.image_full}
		<img
			src={issue.media.image_full}
			alt="cover"
			class="object-cover object-center w-full aspect-1 h-[300px]"
		/>
	{/if}
	<IssueDetailsSection>
		<div class="issues-list-button-override space-y-2">
			<!-- todo properly generate the href -->
			<Button class="p-0" type="link" href="/E79oLnFioicWGNJ1z93qEujE/issues/{issue.id}">
				<h2 class="text-3xl">
					{issue.summary}
				</h2>
			</Button>
			<div class="opacity-60">{issue.address}</div>
			<div class="flex gap-4">
				<IssueStatusIndicator status={issue.status} />
				<CreatedAt timestamp={issue.created_at} />
			</div>
		</div>
	</IssueDetailsSection>
	<hr />
	<IssueDetailsSection>
		<p class="opacity-60 mb-3">
			{issue.description}
		</p>

		{#each issue.questions as qa}
			<p class="font-semibold opacity-70">{qa.question}</p>
			<p class="font-medium opacity-60">{qa.answer}</p>
		{/each}
	</IssueDetailsSection>
	<hr />
	<IssueDetailsSection>
		<div class="grid grid-cols-2 grid-rows-2 gap-y-3">
			<IconWithText>
				<Icon data={eyeSvg} slot="icon" />
				<svelte:fragment slot="text">
					{issue.private_visibility ? 'private' : 'public'}
				</svelte:fragment>
			</IconWithText>
			<IconWithText>
				<UserCircle slot="icon" />
				<svelte:fragment slot="text">
					{issue.reporter.name}
				</svelte:fragment>
			</IconWithText>
			<IconWithText>
				<Clipboard slot="icon" />
				<svelte:fragment slot="text">
					# {issue.id}
				</svelte:fragment>
			</IconWithText>
			<IconWithText>
				<BuildingOffice2 slot="icon" />
				<svelte:fragment slot="text">
					{issue.request_type.organization}
				</svelte:fragment>
			</IconWithText>
		</div>
	</IssueDetailsSection>
	<hr />
	<IssueDetailsSection>
		<h3>Comments ({issue.comments.length})</h3>
		<h5>Comming soon...</h5>
	</IssueDetailsSection>
</div>
