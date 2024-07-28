<script lang="ts">

    type Props = {
        name: string,
        postDate: string,
        postId: string,
        message: string,
        imageUrl?: string
    };

    var { name, postDate, postId, message, imageUrl } : Props = $props();

    let expanded = $state(false);
    let size = $derived(expanded ? "w-72 h-72" : "w-32 h-32");

</script>

<div class="space-y-4">
    <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex">
            {#if imageUrl}
                <a href="" onclick="{() => expanded = !expanded}">
                    <img src="{imageUrl}" alt="Reply" class="{size} object-cover mr-4" />
                </a>
            {/if}
            <div>
                <div class="flex items-center mb-2">
                    <span class="text-gray-500 text-sm">{name}</span>
                    <span class="text-gray-400 text-sm mx-2">|</span>
                    <span class="text-gray-500 text-sm">{postDate}</span>
                    <span class="text-gray-400 text-sm mx-2">|</span>
                    <span class="text-gray-500 text-sm">{postId}</span>
                </div>
                <p class="text-gray-700">
                    {message}
                </p>
            </div>
        </div>
    </div>
</div>