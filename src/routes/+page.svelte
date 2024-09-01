<script lang="ts">
  import "../app.css";
  import { Peerbit } from "peerbit";
  import App from "$lib/ui/App.svelte";
  import { AppController } from "$lib/controller.svelte";

  async function init() {

    var peer = await Peerbit.create({
      directory: "./test10"
    });

    await peer.bootstrap();

    return new AppController(peer);
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
  <div class="flex flex-col items-center justify-center h-screen bg-base-200">
    <div class="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
    <p class="mt-4 text-lg font-semibold text-primary">Loading Echoverse...</p>
    <progress class="progress progress-primary w-56 mt-4"></progress>
  </div>
{:then controller}
  <App {controller} />
{:catch ex}
  <div class="flex flex-col items-center justify-center h-screen bg-base-200">
    <p class="text-error text-lg">{ex.message}</p>
  </div>
{/await}
