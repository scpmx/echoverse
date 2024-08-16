<script lang="ts">
  import "../app.css";
  import { Peerbit } from "peerbit";
  import App from "$lib/components/App.svelte";
  import { AppController } from "$lib/controller.svelte";

  async function init() {

    var peer = await Peerbit.create();

    var controller = new AppController(peer);

    // await peer.bootstrap();

    return controller;
  }

  // onMount(() => {
  //   window.addEventListener("popstate", () => {
  //     // Annoying there's not a beter way to do this...
  //     // Unless there is and I just don't know it...
  //     var state: any = $page.state
  //     var view = state.view;

  //     // TODO: This isn't working right now but im just
  //     // going to keep it as is so I can hopefully fix
  //     // it later. Really weird that it's not working.
  //     if (view) {
  //       var route = JSON.parse(view);
  //       navigation.current = route;
  //     }
  //   });
  // });

</script>

{#await init()}
  <p>Loading...</p>
{:then controller}
  <App {controller} />
{:catch ex}
  <p>{ex.message}</p>
{/await}
