<script lang="ts">
  import NewChatModal from "./NewChatModal.svelte";
  import type { CatalogViewModel, Controller } from "$lib/controller.svelte";
  import { onMount } from "svelte";

  type Props = {
    controller: Controller,
    viewModel: CatalogViewModel
  };

  let { controller, viewModel }: Props = $props();

  onMount(async () => {
    await viewModel.start();
  })

</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Catalog {viewModel.getTicker()}</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
  >
    {#each viewModel.chats as chat}
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
              onclick={async () => await controller.showChat(viewModel.getTicker(), chat.id)}
            >
              Read Now
            </button>
          </div>
        </div>
      </div>
    {/each}
    <NewChatModal {viewModel} />
  </div>
</main>
