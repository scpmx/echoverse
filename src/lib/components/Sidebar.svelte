<script lang="ts">
  import YourThreads from "$lib/components/YourThreads.svelte";
  import YourThreadsHeader from "$lib/components/YourThreadsHeader.svelte";
</script>

<!-- 
  Hide sidebar on small screens. Will have to add a button or something
  to show the sidebar on small screens
 -->
<div class="w-96 flex-col hidden md:flex">
  <YourThreadsHeader />
  <div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
    <YourThreads />
    <div class="p-4">
      <button class="btn btn-ghost">Explore more...</button>
    </div>
  </div>
</div>