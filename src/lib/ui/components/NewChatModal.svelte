<script lang="ts">
  import type { TopicContext } from "$lib/contexts/topic.svelte";
  import type { AppController } from "$lib/controller.svelte";

  type Props = {
    controller: AppController,
    topic: TopicContext
  }

  let { controller, topic }: Props = $props();

  let imageUrl = $state("");
  let title = $state("");
  let content = $state("");
  let name = $state("");
  let showModal = $state(false);

  async function sumbit() {
    var address = await topic.createChat(topic.ticker, title, imageUrl, content, name);
    await controller.loadChatFromAddress(address);
    showModal = false;
    imageUrl = "";
    title = "";
    content = "";
    name = "";
  }

</script>

<!-- Button to open the modal -->
<button class="btn btn-primary" onclick={() => showModal = true}>Create New Chat</button>

<!-- Modal -->
{#if showModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h2 class="text-xl font-bold mb-4">Create New Chat</h2>

      <!-- Optional Name Input -->
      <div class="form-control mb-4">
        <label for="name" class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          id="name"
          type="text"
          class="input input-bordered"
          bind:value={name}
          placeholder="Anonymous"
        />
      </div>

      <!-- Image URL Input -->
      <div class="form-control mb-4">
        <label for="image" class="label">
          <span class="label-text">Image URL</span>
        </label>
        <input
          id="image"
          type="text"
          class="input input-bordered"
          bind:value={imageUrl}
          placeholder="Enter image URL"
        />
      </div>

      <!-- Title Input -->
      <div class="form-control mb-4">
        <label for="title" class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          id="title"
          type="text"
          class="input input-bordered"
          bind:value={title}
          placeholder="Enter chat title"
        />
      </div>

      <!-- Content Input -->
      <div class="form-control mb-4">
        <label for="content" class="label">
          <span class="label-text">Content</span>
        </label>
        <textarea
          id="content"
          class="textarea textarea-bordered"
          bind:value={content}
          placeholder="Enter chat content"
        ></textarea>
      </div>

      <!-- Modal Action Buttons -->
      <div class="modal-action">
        <button class="btn" onclick={() => showModal = false}>Cancel</button>
        <button class="btn btn-primary" onclick={sumbit}>
          Create Chat
        </button>
      </div>
    </div>
  </div>
{/if}
