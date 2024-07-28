<script>
	import { getPeer } from "$lib/client";
	import Thread from "./Thread.svelte";
</script>

{#await getPeer()}
    <p>Loading</p>
{:then peer} 
    <Thread {peer}/>
{/await}
