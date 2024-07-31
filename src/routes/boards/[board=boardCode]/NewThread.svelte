<script lang="ts">
	import { goto } from '$app/navigation';
	import { Thread, type Board } from '$lib/database';
	import { v4 as uuid } from 'uuid';
	import { page } from '$app/stores';

	let showModal = $state(false);

	let name = $state('');
	let title = $state('');
	let imageUrl = $state('');
	let message = $state('');

	type Props = {
		board: Board;
	};

	let { board }: Props = $props();

	async function createThread() {

		var id = uuid();
		var date = new Date().toUTCString();

		if (name == "") {
			name = "Anonymous"
		}

		await board.threads.put(new Thread(id, date, title, imageUrl, message, name));
		await goto("/boards/" + $page.params.board + "/" + id.toString());

		showModal = false;
		name = '';
		title = '';
		imageUrl = '';
		message = '';
	}
</script>

<div class="fixed bottom-4 right-4">
	<button
		onclick={() => (showModal = !showModal)}
		class="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
		aria-label="Create New Thread"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
		</svg>
	</button>
</div>

{#if showModal}
	<div class="fixed inset-0 flex items-center justify-center">
		<div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
			<h2 class="text-2xl font-bold mb-4">Create New Thread</h2>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="name">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					placeholder="Name"
				/>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="title">Title</label>
				<input
					type="text"
					id="title"
					bind:value={title}
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					placeholder="Title"
				/>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="imageUrl">Image URL</label>
				<input
					type="text"
					id="imageUrl"
					bind:value={imageUrl}
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					placeholder="Image URL"
				/>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="message">Message</label>
				<textarea
					id="message"
					bind:value={message}
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					placeholder="Your message..."
					rows="5"
				></textarea>
			</div>
			<button
				onclick={createThread}
				class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
			>
				Create Thread
			</button>
		</div>
	</div>
{/if}
