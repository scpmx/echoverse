<script lang="ts">
  import type { ChatContext } from "$lib/contexts/chat.svelte";
  import type { AppController } from "$lib/controller.svelte";
  import MessageContentPreview from "../components/MessageContentPreview.svelte";
  import MessageContextMenu from "../components/MessageContextMenu.svelte";
  import FormattedMessage from "../components/FormattedMessage.svelte";

  type Props = {
    controller: AppController;
    chat: ChatContext;
  };

  let { controller, chat }: Props = $props();

  let input = $state("");
  let messageContainer: HTMLDivElement;
  let contextMenu = $state({ visible: false, x: 0, y: 0, messageId: "" });

  function scrollToBottom() {
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  $effect(() => {
    if (chat.messages.length) {
      scrollToBottom();
    }
  });

  function extractUrls(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }

  function openContextMenu(event: MouseEvent, messageId: string) {
    event.preventDefault();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    contextMenu = {
      visible: true,
      x: event.clientX,
      y: rect.bottom,
      messageId,
    };
  }

  function handleContextMenuAction(event: CustomEvent) {
    const { action } = event.detail;
    const messageId = contextMenu.messageId;

    switch (action) {
      case "copy":
        const message = chat.messages.find((m) => m.id === messageId);
        if (message) {
          navigator.clipboard.writeText(message.content);
        }
        break;
      case "reply":
        // Implement reply functionality
        console.log("Reply to message:", messageId);
        break;
      case "delete":
        // Implement delete functionality
        console.log("Delete message:", messageId);
        break;
    }
  }

  function quoteMessage(messageId: string) {
    const message = chat.messages.find((m) => m.id === messageId);
    if (message) {
      input += `>>${message.messageIdentifier}\n`;
      scrollToBottom();
    }
  }

  function handleQuoteClick(messageIdentifier: string) {
    // Implement quote functionality
    console.log("Quote message:", messageIdentifier);
  }

  let messageMap = $derived(
    chat.messages.reduce(
      (acc, message) => {
        acc[message.messageIdentifier] = message.content;
        return acc;
      },
      {} as Record<string, string>
    )
  );
</script>

<svelte:head>
  <title>/{chat.ticker}/ {chat.title}</title>
</svelte:head>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">{chat.title}</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div class="flex flex-col h-full">
    <div class="flex-grow overflow-y-scroll" bind:this={messageContainer}>
      <!-- Chat content and image -->
      <div class="p-2 bg-base-100">
        <div class="flex items-center mb-1">
          <span class="font-bold mr-2">{chat.identifier}</span>
          <span class="text-xs opacity-50">{chat.messageIdentifier}</span>
          <span class="mx-2">|</span>
          <time class="text-xs opacity-50"
            >{new Date(chat.date).toLocaleDateString()}
            {new Date(chat.date).toLocaleTimeString()}</time
          >
        </div>
        <MessageContentPreview url={chat.imageUrl} />
        <p class="mt-4 whitespace-pre-wrap">{chat.content}</p>
      </div>

      <!-- Messages -->
      {#each chat.messages as message}
        <div
          class="group flex flex-col p-2 hover:bg-base-200 transition-colors duration-200"
        >
          <div class="flex items-center mb-1">
            <span class="font-bold mr-2 font-mono">{message.identifier}</span>
            <button
              class="text-xs opacity-50 font-mono cursor-pointer hover:opacity-100 bg-transparent border-none p-0"
              onclick={() => quoteMessage(message.id)}
              >{message.messageIdentifier}</button
            >
            <span class="mx-2">|</span>
            <time class="text-xs opacity-50 font-mono"
              >{message.date.toLocaleDateString()}
              {message.date.toLocaleTimeString()}</time
            >
            <button
              class="ml-auto p-1 hover:bg-base-300 rounded invisible group-hover:visible transition-opacity duration-200"
              onclick={(e) => openContextMenu(e, message.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </button>
          </div>
          <FormattedMessage
            content={message.content}
            messages={chat.messages}
          />
        </div>
        {#each extractUrls(message.content) as url}
          <div class="p-2">
            <MessageContentPreview {url} />
          </div>
        {/each}
      {/each}
    </div>
    <div class="flex items-center p-4 rounded-lg shadow">
      <textarea
        class="flex-1 resize-none p-2 rounded-lg border focus:outline-none focus:ring-2"
        placeholder="Type your reply..."
        bind:value={input}
        rows="3"
      ></textarea>
      <button
        class="btn btn-accent m-4"
        onclick={async () => {
          chat.addMessage(input);
          input = "";
        }}
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

<MessageContextMenu
  bind:visible={contextMenu.visible}
  x={contextMenu.x}
  y={contextMenu.y}
  on:action={handleContextMenuAction}
/>
