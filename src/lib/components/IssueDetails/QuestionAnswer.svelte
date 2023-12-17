<script lang="ts">
	import type { IssueWithDetails } from '$lib/services/SeeClickFix/SeeClickFixService';

	export let questionAnswerArray: IssueWithDetails['questions'] = [];
</script>

{#each questionAnswerArray as qa}
	<p>{qa.question}:</p>
	<p>{qa.answer}</p>
{/each}
