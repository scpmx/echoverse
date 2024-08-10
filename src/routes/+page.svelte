<script lang="ts">
  import "../app.css";
  import { Peerbit } from "peerbit";
  import App from "$lib/components/App.svelte";

  async function init() {
    var peer = Peerbit.create();
    return peer;
  }
</script>

{#await init()}
  <p>Loading...</p>
{:then peer}
  <App {peer} />
{:catch ex}
  <p>{ex.message}</p>
{/await}
