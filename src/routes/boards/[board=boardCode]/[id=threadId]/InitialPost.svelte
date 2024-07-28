<script lang="ts">
	import type { Thread } from "$lib/database"

    type Props = {
        thread: Thread
    }

    let { thread }: Props = $props()
</script>

<div class="bg-white shadow-md rounded-lg p-4 mb-4">
    <div class="flex">
        <img src="{thread.imageUrl}" alt="Thread" class="w-64 h-64 object-cover mr-4" />
        <div>
            <h1 class="text-2xl font-bold mb-2">{thread.title}</h1>
            <div class="flex items-center mb-2">
                <span class="text-gray-500 text-sm">Anonymous</span>
                <span class="text-gray-400 text-sm mx-2">|</span>
                <span class="text-gray-500 text-sm">Date</span>
                <span class="text-gray-400 text-sm mx-2">|</span>
                <span class="text-gray-500 text-sm">id</span>
            </div>
            <p class="text-gray-700">
                {thread.message}
            </p>
        </div>
    </div>
</div>