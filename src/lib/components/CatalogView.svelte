<script lang="ts">
  import { navigation } from "$lib/navigation.svelte";

  type Props = {
    ticker: string;
  };

  let { ticker }: Props = $props();
</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Catalog /{ticker}/</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
  >
    {#each { length: 30 } as _}
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Hello world this is a long ass title</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            officia fuga at qui deleniti?
          </p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              onclick={() =>
                navigation.navigate({ route: "chat", id: "hello lmao" })}
            >
              Read Now
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>
