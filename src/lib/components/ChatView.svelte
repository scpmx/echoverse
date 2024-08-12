<script lang="ts">
  import { Chat, Message } from "$lib/database";
  import type { ChatRoute } from "$lib/navigation.svelte";
  import { chats, topics } from "$lib/state.svelte";
  import { SearchRequest, StringMatch } from "@peerbit/document";
  import { sidebarController } from "$lib/sidebar.svelte";
  import type { Peerbit } from "peerbit";
  import { getTopicByTicker } from "$lib/topics";
  
  type Props = {
    peer: Peerbit;
    chatRoute: ChatRoute;
  };

  let { peer, chatRoute }: Props = $props();

  let messages = $state<Message[]>([]);
  let input = $state("");

  async function init(): Promise<Chat> {
    var topic = topics.get(chatRoute.ticker)!;
    var chat = chats.get(chatRoute.id);

    if (!chat) {

      var [query] = await topic.chats.index.search(
        new SearchRequest({
          query: [new StringMatch({ key: "id", value: chatRoute.id })],
        })
      );

      chat = query;

      if (chat.closed) {
        console.log("opening chat");
        chat = await peer.open(chat);
        chats.set(chatRoute.id, chat);
      }
    }
    else {
      console.log("found chat in chats");
    }

    var ms = await chat.messages.index.search(new SearchRequest());

    messages.push(...ms);

    await chat.messages.events.addEventListener("change", (evt) => {
      messages.push(...evt.detail.added);
    });

    var boardName = getTopicByTicker(topic.ticker);

    sidebarController.add(boardName, topic.ticker, chat.id, chat.title);

    return chat;
  }
</script>

{#await init()}
  <p>Loading...</p>
{:then chat}
  <div class="p-4 bg-base-200 border-b border-base-300">
    <h1 class="text-xl font-bold">/{chatRoute.ticker}/ {chat.title}</h1>
  </div>
  <main class="relative flex-1 overflow-y-auto">
    <div class="flex flex-col h-full">
      <div class="flex-grow overflow-y-scroll">
        {#each messages as message}
          <div class="chat {true ? 'chat-end' : 'chat-start'}">
            <div class="chat-bubble">
              <div class="max-w-96">
                {message.content}
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="flex items-center p-4 rounded-lg shadow">
        <textarea
          class="flex-1 resize-nonep-2 rounded-lg border focus:outline-none focus:ring-2"
          placeholder="Type your reply..."
          bind:value={input}
        ></textarea>
        <button
          class="btn btn-accent m-4"
          onclick={async () =>
            await chat.messages.put(
              new Message(new Date().toDateString(), input)
            )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  </main>
{:catch ex}
  <p>{ex.message}</p>
{/await}
