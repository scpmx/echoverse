<script lang="ts">
  import YourThreads from "$lib/components/YourThreads.svelte";
  import YourThreadsHeader from "$lib/components/YourThreadsHeader.svelte";
</script>

<div class="w-96 flex flex-col">
  <YourThreadsHeader />
  <div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
    <YourThreads />
    <div class="p-4">
      <button class="btn btn-ghost">Explore more...</button>
    </div>
  </div>
</div>
