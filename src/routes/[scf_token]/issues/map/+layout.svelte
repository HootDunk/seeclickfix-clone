<script lang="ts">
	import { onMount } from 'svelte';
	import LandingPageLayout from '../../../../lib/pages/LandingPage/LangingPageLayout.svelte';
	import GoogleMap from '$lib/components/IssuesMap.svelte';
	import {
		MockSeeClickFixService,
		asAsyncSuccess,
		type SeeClickFixService,
		ASYNC_IN_PROGRESS,
		type AsyncResult,
		type IssuesResponse
	} from '$lib/services/SeeClickFix/SeeClickFixService';
	import IssuesMap from '$lib/components/IssuesMap.svelte';
	onMount(() => console.log('layout mount'));

	// can access the lat and lng from the route params and use them to load data from within the different +page.svelte components

	// todo mobile view map overlay (click single issue on map => shows card over map.  if issue is selected in desktop and mobile breakpoint is hit, then it shows card overlay)
	// may need to have selectedIssue be a part of the store. or that value is resolved from url..
	// or could have it as a store and set the value from inside onMount inside that components page.
	// lets work on the "New Request" button to get an idea of adding elements over the map

	// need to load the data here (edit because of the filter in the header, it will need to be accessible there) so that we can create a context/store for access from both the side-bar and the main-content

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

	// entire app can useSeeClickFixService (don't pass in the sdk unless you use the AsyncResult type)
	// inside if here we will likely create an issuesContext.  for now lets just pass the data into the map directly and work on the issues display.  that may have some implications on how we design our context/store
</script>

<LandingPageLayout>
	<slot slot="side-bar" />
	<div class="map-wrapper" slot="main-content">
		<IssuesMap {issuesResponse} />
		<!-- <div class="overlay">
			<h3>hello world</h3>
		</div>
		<div class="absolute inset-x-10 bottom-10">
			<h3>hello tailwind</h3>
		</div> -->
	</div>
</LandingPageLayout>

<style>
	.map-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.overlay {
		position: absolute;
		z-index: 1000;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		/* width: 100px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto; */
	}
</style>
