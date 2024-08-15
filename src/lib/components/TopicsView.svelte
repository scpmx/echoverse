<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";

  // import { navigation } from "$lib/navigation.svelte";
  import { topics } from "$lib/topics";
  
  type Props = {
    controller: AppController
  }

  let { controller }: Props = $props();

</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Boards</h1>
</div>

<main
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
>
  {#each topics as topic}
    <button
      class="btn btn-outline flex flex-col items-center p-4"
      onclick={async () => await controller.showCatalog(topic.ticker) }
    >
      <span class="text-lg font-bold">{topic.ticker.toUpperCase()}</span>
      <span class="text-sm">{topic.name}</span>
    </button>
  {/each}
</main>
