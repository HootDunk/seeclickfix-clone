<script lang="ts">
	import { onMount } from 'svelte';
	import LandingPageLayout from '../../../../lib/pages/LandingPage/LangingPageLayout.svelte';
	import GoogleMap from '$lib/components/GoogleMap.svelte';
	import {
		MockSeeClickFixService,
		asAsyncSuccess,
		type SeeClickFixService,
		ASYNC_IN_PROGRESS,
		type AsyncResult,
		type IssuesResponse
	} from '$lib/services/SeeClickFix/SeeClickFixService';
	onMount(() => console.log('layout mount'));

	// when I click on an issue, the issue details are shown on the left side.
	// when I click back, then the issue details list is shown

	// can access the lat and lng from the route params and use them to load data from within the different +page.svelte components

	// todo mobile view map overlay (click single issue on map => shows card over map.  if issue is selected in desktop and mobile breakpoint is hit, then it shows card overlay)

	// need to load the data here so that we can create a context/store for access from both the side-bar and the main-content

	const seeClickFixService: SeeClickFixService = new MockSeeClickFixService();
	let issuesResponse: AsyncResult<IssuesResponse> = ASYNC_IN_PROGRESS;
	onMount(loadIssues);

	async function loadIssues(page: number = 1) {
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
	}

	// map can dispatch

	// entire app can useSeeClickFixService
	// inside if here we will likely create an issuesContext.  for now lets just pass the data into the map directly and work on the issues display.  that may have some implications on how we design our context/store
</script>

<LandingPageLayout>
	<slot slot="side-bar" />
	<GoogleMap {issuesResponse} slot="main-content" />
</LandingPageLayout>
