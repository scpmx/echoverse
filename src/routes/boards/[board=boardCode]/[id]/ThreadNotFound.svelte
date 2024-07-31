<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="bg-gray-100 flex items-center justify-center h-screen">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-800">Thread Not Found</h1>
		<p class="mt-4 text-gray-600">
			Sorry, the thread you are looking for does not exist or has been removed.
		</p>
		<a
			href="/boards/{$page.params.board}/"
			class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
		>
			Go Back Home
		</a>
	</div>
</div>
