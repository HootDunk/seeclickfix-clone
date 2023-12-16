<script lang="ts">
	import { onMount } from 'svelte';
	import LandingPageLayout from '../../../../lib/pages/LandingPage/LangingPageLayout.svelte';
	import GoogleMap from '$lib/components/GoogleMap.svelte';
	onMount(() => console.log('layout mount'));

	// when I click on an issue, the issue details are shown on the left side.
	// when I click back, then the issue details list is shown

	// layout component will need to have the map and then forward the slot of the side bar

	// can access the lat and lng from the route params and use them to load data from within the different +page.svelte components
</script>

<LandingPageLayout>
	<slot slot="side-bar" />
	<GoogleMap slot="main-content" />
</LandingPageLayout>
