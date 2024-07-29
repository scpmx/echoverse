<script lang="ts">

	import { getPeer } from "$lib/client";
    import { page } from "$app/stores";
	import { Thread as DBThread } from "$lib/database";
    import Thread from './Thread.svelte'

    async function getThread() {

        var peer = await getPeer();

        var thread = await peer.open(new DBThread($page.params.id, "My Thread", "https://i.imgur.com/W33X57A.jpeg", "My message"));

        return thread;
    }

</script>

{#await getThread()}
    <p>Loading</p>
{:then thread}
    <Thread {thread} />
{/await}
