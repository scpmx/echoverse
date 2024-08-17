<script lang="ts">
  import TopicView from "./views/TopicView.svelte";
  import ChatView from "./views/ChatView.svelte";
  import TopicsView from "./views/TopicsView.svelte";
  import SidebarView from "./views/SidebarView.svelte";
  import type { AppController } from "$lib/controller.svelte";
  import { onMount } from "svelte";
  
  type Props = {
    controller: AppController
  };

  let { controller }: Props = $props();

  onMount(async () => {
    await controller.init();
  })

</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <SidebarView {controller} context={controller.sidebarContext} />
  </div>
  <div class="flex-1 flex flex-col">
    {#if controller.mainContent.route == "chat"}
      <ChatView {controller} chat={controller.mainContent.chat} />
    {:else if controller.mainContent.route == "topic"}
      <TopicView {controller} topic={controller.mainContent.topic} />
    {:else if controller.mainContent.route == "topics"}
      <TopicsView {controller} />
    {/if}
  </div>
</div>
