<script lang="ts">
  import "../app.css";
  import CollapsibleThreadList from "$lib/components/CollapsibleThreadList.svelte";
  import { messages, pinnedBoards } from "$lib/state.svelte";
</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <div class="p-4 bg-base-200 border-b border-base-300">
      <h2 class="text-xl font-bold">Your Threads</h2>
    </div>
    <div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
      {#each pinnedBoards as board}
        <CollapsibleThreadList {board} />
      {/each}
      <div class="p-4">
        <button class="btn btn-ghost">Explore more...</button>
      </div>
    </div>
  </div>
  <div class="flex-1 flex flex-col">
    <div class="p-4 bg-base-200 border-b border-base-300">
      <h1 class="text-xl font-bold">This is the title</h1>
    </div>
    <main class="relative flex-1 overflow-y-auto">
      <div class="flex flex-col h-full">
        <div class="flex-grow overflow-y-scroll">
          {#each messages as chat}
            <div class="chat {chat.fromSelf ? 'chat-end' : 'chat-start'}">
              <div class="chat-bubble">
                <div class="max-w-96">
                  {chat.message}
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div class="flex items-center p-4 rounded-lg shadow">
          <textarea
            class="flex-1 resize-nonep-2 rounded-lg border focus:outline-none focus:ring-2"
            placeholder="Type your reply..."
          ></textarea>
          <button class="btn btn-accent m-4">
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
  </div>
</div>
