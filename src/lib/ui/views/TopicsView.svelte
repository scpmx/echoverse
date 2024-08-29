<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";
  import { topics } from "$lib/static/topics";
  
  type Props = {
    controller: AppController
  }

  let { controller }: Props = $props();

  // Group topics by category
  const groupedTopics = topics.reduce((acc, topic) => {
    const category = topic.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(topic);
    return acc;
  }, {} as Record<string, typeof topics>);

  // Function to handle topic click
  function handleTopicClick(topic: any) {
    controller.openTopic(topic);
  }
</script>

<svelte:head>
  <title>Echoverse</title>
</svelte:head>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">Topics</h1>
</div>

<main class="p-4">
  {#each Object.entries(groupedTopics) as [category, categoryTopics]}
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">{category}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each categoryTopics as topic}
          <button
            class="text-left p-2 hover:bg-base-200 rounded transition-colors"
            onclick={() => handleTopicClick(topic)}
          >
            <span class="text-base">{topic.name}</span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</main>
