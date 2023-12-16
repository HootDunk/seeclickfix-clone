<script lang="ts" context="module">
	type DesiredPageNumber = {
		desiredPage: number;
	};
	export type PaginationDispatcherType = {
		previousClick: DesiredPageNumber;
		nextClick: DesiredPageNumber;
	};
</script>

<script lang="ts">
	import type { Pagination } from '$lib/services/SeeClickFix/SeeClickFixService';
	import { Button } from 'stwui';
	import { chevronRightSvg } from '../Svg/outline/ChevronRight.svelte';
	import { chevronLeftSvg } from '../Svg/outline/ChevronLeft.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<PaginationDispatcherType>();

	export let pagination: Pagination;

	$: upperBound = pagination.page * pagination.per_page;
	$: lowerBound = upperBound - pagination.per_page;
</script>

<div class="text-base text-slate-600 font-semibold">
	{lowerBound} - {upperBound} of {pagination?.entries}
	<span class="ml-1">
		<Button
			type={!pagination.previous_page ? 'ghost' : 'text'}
			disabled={!pagination.previous_page}
			on:click={() => dispatch('previousClick', { desiredPage: pagination.page - 1 })}
			shape="circle"
		>
			<Button.Icon data={chevronLeftSvg} slot="icon" />
		</Button>
		<Button
			type={!pagination.next_page ? 'ghost' : 'text'}
			disabled={!pagination.next_page}
			shape="circle"
			on:click={() => dispatch('nextClick', { desiredPage: pagination.page + 1 })}
		>
			<Button.Icon data={chevronRightSvg} slot="icon" />
		</Button>
	</span>
</div>
