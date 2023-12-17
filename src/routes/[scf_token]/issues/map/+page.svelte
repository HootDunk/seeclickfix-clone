<script lang="ts">
	import {
		MockSeeClickFixService,
		type IssuesResponse,
		type AsyncResult,
		ASYNC_IN_PROGRESS,
		asAsyncSuccess
	} from '$lib/services/SeeClickFix/SeeClickFixService';
	import { onMount } from 'svelte';

	import Pagination, {
		type PaginationDispatcherType
	} from '$lib/components/IssuesList/Pagination.svelte';
	import { Progress } from 'stwui';
	import IssuesList from '$lib/components/IssuesList/IssuesList.svelte';
	const seeClickFixService = new MockSeeClickFixService();

	let issuesResponse: AsyncResult<IssuesResponse> = ASYNC_IN_PROGRESS;
	let showLocalLoader = false;
	onMount(loadIssues);

	async function loadIssues(page: number = 1) {
		showLocalLoader = true;
		const res = await seeClickFixService.getIssues({
			area: {
				min_lat: 36.03282181999068,
				max_lat: 6.093566455321536,
				min_lng: -94.17250121704095,
				max_lng: -94.14331878295897
			},
			statuses: ['Acknowledged', 'Closed', 'Open'],
			page
		});
		issuesResponse = asAsyncSuccess(res);
		showLocalLoader = false;
	}
</script>

{#if issuesResponse.type === 'success'}
	<div class="px-4">
		<h2 class="flex justify-between items-center text-base mt-4">
			Requests
			<Pagination
				on:nextClick={(e) => loadIssues(e.detail.desiredPage)}
				on:previousClick={(e) => loadIssues(e.detail.desiredPage)}
				pagination={issuesResponse.value.metadata.pagination}
			/>
		</h2>
		<div class={showLocalLoader ? 'visible' : 'invisible'}>
			<Progress size="xs" indeterminate />
		</div>
	</div>
	<IssuesList issuesResponse={issuesResponse.value} />
{/if}
