<script lang="ts">
	import { Reply, Thread } from '$lib/database';

	type Props = {
		thread: Thread;
	};

	let { thread }: Props = $props();

	let message = $state('');
	let imageUrl = $state('');
	let showImagePreview = $state(false);

	function handleImageUrlChange() {
		showImagePreview = imageUrl !== '';
	}

	async function handleSend() {

    // Todo: add section for name

    var date = new Date().toUTCString();
		await thread.replies.put(new Reply(date, message, "Anonymous", imageUrl));

		message = '';
		imageUrl = '';
		showImagePreview = false;
	}
</script>

<div
	class="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 flex flex-col md:flex-row md:items-center"
>
	<textarea
		bind:value={message}
		rows="1"
		placeholder="Type a message..."
		class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
	></textarea>

	<input
		type="text"
		bind:value={imageUrl}
		placeholder="Optional image URL"
		class="flex-1 mt-2 md:mt-0 md:ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		oninput={handleImageUrlChange}
	/>

	{#if showImagePreview && imageUrl !== ''}
		<img
			src={imageUrl}
			alt="idk"
			class="mt-2 md:mt-0 md:ml-2 max-w-xs max-h-32 rounded-md border"
			onerror={() => (showImagePreview = false)}
		/>
	{/if}

	<button
		onclick={handleSend}
		class="ml-2 mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
	>
		Send
	</button>
</div>

<style>
	.resize-none {
		resize: none;
	}
</style>
