<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	let mapElement: HTMLDivElement;
	let map: google.maps.Map;
	onMount(() => {
		// todo may not need to load onMount (but probably do)
		const loader = new Loader({
			apiKey: 'AIzaSyDo-j3odI6X6jwwpwA1JH3xzxc-PGtHo74',
			version: 'weekly'
		});

		const lat = 36.063200000000045;
		const lng = -94.17250121704095;

		const styles = [
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [{ visibility: 'off' }]
			}
		];
		// google.maps.importLibrary("maps")
		loader.load().then(async () => {
			const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
			map = new Map(mapElement, {
				center: { lat, lng },
				zoom: 14,
				mapTypeControl: false,
				gestureHandling: 'greedy',
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles,
				streetViewControl: false,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				fullscreenControl: false
			});
		});
	});
</script>

<div bind:this={mapElement} />

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
