<script lang="ts">
  import { navigation } from "$lib/navigation.svelte";

  type Board = {
    ticker: string;
    name: string;
  };

  let boards: Board[] = [
    { ticker: "biz", name: "Business and Finance" },
    { ticker: "sci", name: "Science and Mathematics" },
    { ticker: "x", name: "Paranormal" },
    { ticker: "v", name: "Videogames" },
    { ticker: "b", name: "Random" },
    { ticker: "k", name: "Weapons" },
    { ticker: "wsg", name: "Worksafe GIF" },
    { ticker: "mu", name: "Music" },
    { ticker: "lit", name: "Literature" },
  ];
</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Boards</h1>
</div>

<main
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
>
  {#each boards as board}
    <button
      class="btn btn-outline flex flex-col items-center p-4"
      onclick={() =>
        navigation.navigate({ route: "catalog", ticker: board.ticker })}
    >
      <span class="text-lg font-bold">{board.ticker.toUpperCase()}</span>
      <span class="text-sm">{board.name}</span>
    </button>
  {/each}
</main>
