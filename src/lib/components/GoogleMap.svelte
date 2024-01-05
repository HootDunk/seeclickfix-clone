<script lang="ts" context="module">
	type Props = { center: { lat: number; lng: number }; zoom: number };
	export type GoogleMapEvents = {
		ready: google.maps.Map;
	};
</script>

<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<GoogleMapEvents>();

	export let props: Props;

	let mapElement: HTMLDivElement;

	onMount(() => {
		initMap(props);
	});

	function initMap(props: Props) {
		const loader = new Loader({
			apiKey: 'AIzaSyDo-j3odI6X6jwwpwA1JH3xzxc-PGtHo74',
			version: 'quarterly'
		});

		// todo refactor
		// https://developers.google.com/maps/documentation/javascript/libraries
		// add key to script and use below method
		// google.maps.importLibrary("maps")
		loader.load().then(async () => {
			const styles = [
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }]
				}
			];

			const defaultOpts: google.maps.MapOptions = {
				mapTypeControl: false,
				gestureHandling: 'greedy',
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles,
				streetViewControl: false,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				fullscreenControl: false,
				draggableCursor: 'default'
			};

			const completeMapOpts: google.maps.MapOptions = {
				...props,
				...defaultOpts
			};
			const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
			const map = new Map(mapElement, completeMapOpts);

			// todo create MapContext here and then all children can use it.
			//  that way we can have a GoogleMapMarker svelte component which takes google.mapsMarkerOpts props (will need to figure out where to import the types from)
			dispatch('ready', map);
		});
	}
</script>

<div bind:this={mapElement} />

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
