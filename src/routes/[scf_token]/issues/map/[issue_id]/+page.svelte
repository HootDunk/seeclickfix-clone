<script lang="ts">
	import { page } from '$app/stores';
	import IssueDetails from '$lib/components/IssueDetails/IssueDetails.svelte';

	import {
		ASYNC_IN_PROGRESS,
		MockSeeClickFixService,
		type AsyncResult,
		type SeeClickFixService,
		asAsyncSuccess,
		type IssueWithDetails
	} from '$lib/services/SeeClickFix/SeeClickFixService';
	import { onMount } from 'svelte';
	const seeClickFixService: SeeClickFixService = new MockSeeClickFixService();

	let issueWithDetailsResponse: AsyncResult<IssueWithDetails> = ASYNC_IN_PROGRESS;

	onMount(async () => {
		const res: IssueWithDetails = await seeClickFixService.getIssueWithDetails({
			id: +$page.params.issue_id
		});

		issueWithDetailsResponse = asAsyncSuccess(res);
	});
</script>

{#if issueWithDetailsResponse.type === 'success'}
	<IssueDetails issue={issueWithDetailsResponse.value} />
{/if}
