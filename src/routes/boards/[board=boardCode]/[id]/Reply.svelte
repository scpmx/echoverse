<script lang="ts">

    import { Reply } from "$lib/database";

    type Props = {
        reply: Reply
    };

    var { reply } : Props = $props();

    let expanded = $state(false);
    let size = $derived(expanded ? "w-72 h-72" : "w-32 h-32");

</script>

<div class="space-y-4 mb-4">
    <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex">
            {#if reply.imageUrl}
                <a href="" onclick="{() => expanded = !expanded}">
                    <img src="{reply.imageUrl}" alt="Reply" class="{size} object-cover mr-4" />
                </a>
            {/if}
            <div>
                <div class="flex items-center mb-2">
                    <span class="text-gray-500 text-sm">{reply.name}</span>
                    <span class="text-gray-400 text-sm mx-2">|</span>
                    <span class="text-gray-500 text-sm">{reply.date}</span>
                    <span class="text-gray-400 text-sm mx-2">|</span>
                    <span class="text-gray-500 text-sm">{reply.id.slice(0, 4) + reply.id.slice(-4)}</span>
                </div>
                <p class="text-gray-700">
                    {reply.message}
                </p>
            </div>
        </div>
    </div>
</div>