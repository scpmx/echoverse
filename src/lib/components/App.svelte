<script lang="ts">
  import CatalogView from "./CatalogView.svelte";
  import ChatView from "./ChatView.svelte";
  import TopicsView from "./TopicsView.svelte";
  import Sidebar from "./Sidebar.svelte";
  import type { AppController } from "$lib/controller.svelte";
  
  type Props = {
    controller: AppController
  };

  let { controller }: Props = $props();

</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <Sidebar {controller} />
  </div>
  <div class="flex-1 flex flex-col">
    {#if controller.mainContent.route == "chat"}
      <ChatView {controller} chat={controller.mainContent.chat} />
    {:else if controller.mainContent.route == "catalog"}
      <CatalogView {controller} catalog={controller.mainContent.catalog} />
    {:else if controller.mainContent.route == "topics"}
      <TopicsView {controller} />
    {/if}
  </div>
</div>
