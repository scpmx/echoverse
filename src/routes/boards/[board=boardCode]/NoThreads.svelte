<script>
    import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center justify-center h-full text-center">
	<h2 class="text-2xl font-bold mb-4">/{$page.params.board}/</h2>
	<p class="text-lg mb-2">No Threads Yet</p>
	<p class="text-gray-600 mb-6">
		It looks like this board is currently empty. Be the first to get the conversation started!
	</p>
</div>

<style>
	/* Optional custom styles */
	.h-full {
		min-height: 100vh; /* Ensures full height */
	}
</style>
