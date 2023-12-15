<script lang="ts">
	import {
		MockSeeClickFixService,
		type IssuesResponse,
		type AsyncResult,
		ASYNC_IN_PROGRESS,
		asAsyncSuccess
	} from '$lib/services/SeeClickFix/SeeClickFixService';
	import { onMount } from 'svelte';
	import LangingPageLayout from './LangingPageLayout.svelte';
	import IssuesList from '../../components/IssuesList/IssuesList.svelte';
	import Pagination, {
		type PaginationDispatcherType
	} from '$lib/components/IssuesList/Pagination.svelte';
	import { Progress } from 'stwui';
	const seeClickFixService = new MockSeeClickFixService();

	let issuesResponse: AsyncResult<IssuesResponse> = ASYNC_IN_PROGRESS;
	let showLocalLoader = false;
	// todo use await block instead.
	// edit, don't do that, create a type for these situations type thing = T | error = unknown | "loading"
	// or make sure that we re-throw our error in the service so that it atleast has some knowable form
	// definitely look online for this type
	// https://codewithstyle.info/typescript-async-result/#:~:text=AsyncResult%20is%20a%20simple%20type,fetch%20call%20in%20our%20case).
	// AsyncResult
	// go with the linked article as it even mentions React Query
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
			statuses: ['acknowledged', 'closed', 'open'],
			page
		});
		issuesResponse = asAsyncSuccess(res);
		showLocalLoader = false;
	}
</script>

<LangingPageLayout>
	<svelte:fragment slot="side-bar">
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
	</svelte:fragment>

	<svelte:fragment slot="main-content">
		<h1>main-content</h1>
	</svelte:fragment>
</LangingPageLayout>
