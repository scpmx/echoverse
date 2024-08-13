<script lang="ts">
  import CatalogView from "./CatalogView.svelte";
  import ChatView from "./ChatView.svelte";
  import TopicsView from "./TopicsView.svelte";
  import Sidebar from "./Sidebar.svelte";
  import type { Controller } from "$lib/controller.svelte";
  
  type Props = {
    controller: Controller
  };

  let { controller }: Props = $props();

</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <Sidebar {controller} />
  </div>
  <div class="flex-1 flex flex-col">
    {#if controller.view.route == "chat"}
      <ChatView {controller} chatVm={controller.view.viewModel} />
    {:else if controller.view.route == "catalog"}
      <CatalogView {controller} viewModel={controller.view.viewModel} />
    {:else if controller.view.route == "topics"}
      <TopicsView {controller} />
    {/if}
  </div>
</div>
