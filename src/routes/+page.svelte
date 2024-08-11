<script lang="ts">
  import "../app.css";
  import { Peerbit } from "peerbit";
  import App from "$lib/components/App.svelte";
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { navigation } from "$lib/navigation.svelte";

  async function init() {
    var peer = await Peerbit.create();

    // await peer.bootstrap();

    return peer;
  }

  onMount(() => {
    window.addEventListener("popstate", () => {
      // Annoying there's not a beter way to do this...
      // Unless there is and I just don't know it...
      var state: any = $page.state
      var view = state.view;

      // TODO: This isn't working right now but im just
      // going to keep it as is so I can hopefully fix
      // it later. Really weird that it's not working.
      if (view) {
        var route = JSON.parse(view);
        navigation.current = route;
      }
    });
  });

</script>

{#await init()}
  <p>Loading...</p>
{:then peer}
  <App {peer} />
{:catch ex}
  <p>{ex.message}</p>
{/await}
