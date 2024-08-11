<script lang="ts">
  import { Chat, Topic } from "$lib/database";
  import { navigation } from "$lib/navigation.svelte";
  import { SearchRequest } from "@peerbit/document";
  import type { Peerbit } from "peerbit";
  import { onMount } from "svelte";
  import NewChatModal from "./NewChatModal.svelte";

  type Props = {
    peer: Peerbit,
    ticker: string
  };

  let { peer, ticker }: Props = $props();

  let chats = $state<Chat[]>([]);

  onMount(async () => {
    var db = await peer.open(new Topic(ticker));

    // await db.chats.put(new Chat("this-is-the-id", new Date().toDateString(), "Hello World", "https://i.imgur.com/Neqq1CY.jpeg", "Hello World Content"));

    var ch = await db.chats.index.search(new SearchRequest());

    chats.push(...ch);

    await db.chats.events.addEventListener("change", (evt) => {
        chats.push(...evt.detail.added);
    })


  });
</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Catalog /{ticker}/</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
  >
    {#each chats as chat}
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={chat.imageUrl}
            alt="Chat"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{chat.title}</h2>
          <p>
            {chat.content}
          </p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              onclick={() =>
                navigation.navigate({ route: "chat", id: chat.id })}
            >
              Read Now
            </button>
          </div>
        </div>
      </div>
    {/each}
    <NewChatModal />
  </div>
</main>
