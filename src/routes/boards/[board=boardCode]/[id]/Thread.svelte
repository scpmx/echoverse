<script lang="ts">

	import { Reply as ReplyDB, Thread } from "$lib/database";
	import InitialPost from "./InitialPost.svelte";
	import NewReply from "./NewReply.svelte";
	import Reply from "./Reply.svelte";
	import { SearchRequest } from "@peerbit/document";

    type Props = {
        thread: Thread
    }

    var { thread }: Props = $props()

    var replies = $state<ReplyDB[]>([])

    thread.replies.index
        .search(new SearchRequest())
        .then(xs => replies.push(...xs));

    thread.replies.events.addEventListener("change", x => {
        replies.push(...x.detail.added);
    });

</script>

<div class="bg-gray-100 text-gray-800">
    <div class="container mx-auto p-4">

        <InitialPost {thread} />

        {#each replies as reply}
            <Reply {reply} />
        {/each}

    </div>

    <NewReply {thread} />

</div>    