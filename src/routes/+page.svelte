<script lang="ts">

    import { Peerbit } from "peerbit";

    async function init() {
        var c1 = await Peerbit.create();

        return c1.peerId.toString();
    }

</script>

{#await init()}
    <p>loading...</p>
{:then x} 
    <p>{x}</p>
{/await}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
