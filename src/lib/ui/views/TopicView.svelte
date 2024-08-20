<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";
  import type { TopicContext } from "$lib/contexts/topic.svelte";
  import NewChatModal from "../components/NewChatModal.svelte";
  
  type Props = {
    controller: AppController,
    topic: TopicContext
  };

  let { controller, topic }: Props = $props();

</script>

<svelte:head>
  <title>/{topic.ticker}/</title>
</svelte:head>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">/{topic.ticker}/</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
  >
    {#each topic.chats as chat}
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img src={chat.imageUrl} alt="Chat" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{chat.title}</h2>
          <p>
            {chat.content}
          </p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              onclick={async () => await controller.openChat(chat)}
            >
              Read Now
            </button>
          </div>
        </div>
      </div>
    {/each}
    <NewChatModal {controller} {topic} />
  </div>
</main>
