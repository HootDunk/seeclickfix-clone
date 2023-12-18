<script lang="ts" context="module">
	import openPng from '$lib/assets/open.png';
	import closedPng from '$lib/assets/closed.png';
	import acknowledgedPng from '$lib/assets/acknowledged.png';
	import archivedPng from '$lib/assets/archivedPng.png';

	const statusToPngMap = {
		Open: openPng,
		Closed: closedPng,
		Acknowledged: acknowledgedPng,
		Archived: archivedPng
	};

	// likely will want to create a map of Map<IssueId, Marker>  so that we can update individual markers on click
	// can the 'selected' marker and have it hidden, on click hide the issue marker and update selected marker position

	// also should later refactor this to simply dispatch events so that it is up to the user what happens on click
	function createIssueMarker(issue: IssuesResponse['issues'][0], map: google.maps.Map) {
		const marker = new google.maps.Marker({
			position: {
				lat: issue.lat,
				lng: issue.lng
			},
			map,
			title: issue.summary,
			clickable: true,
			icon: {
				url: statusToPngMap[issue.status],
				scaledSize: new google.maps.Size(22, 22)
			}
		});
		marker.addListener('click', () => goto(`/E79oLnFioicWGNJ1z93qEujE/issues/map/${issue.id}`));

		return marker;
	}

	function createIssueMarkers(issues: Array<IssuesResponse['issues'][0]>, map?: google.maps.Map) {
		if (!map) return;
		// todo clear any existing markers
		// todo use reduce function instead of map and create issueIdIssueMarkerMap
		return issues.map((issue) => createIssueMarker(issue, map));
	}
</script>

<script lang="ts">
	import type { AsyncResult, IssuesResponse } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { goto } from '$app/navigation';
	import GoogleMap from './GoogleMap.svelte';

	export let issuesResponse: AsyncResult<IssuesResponse>;

	let map: google.maps.Map | undefined;

	$: if (issuesResponse.type === 'success' && map)
		createIssueMarkers(issuesResponse.value.issues, map);

	const props = {
		center: { lat: 36.063200000000045, lng: -94.17250121704095 },
		zoom: 14
	};
</script>

<GoogleMap {props} on:ready={(e) => (map = e.detail)} />
