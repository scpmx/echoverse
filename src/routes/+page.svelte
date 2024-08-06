<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import ScrollableContent from "$lib/components/ScrollableContent.svelte";
</script>

<div class="flex h-screen">
    
  <Sidebar />

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col">
    <!-- Fixed Header Section -->
    <div class="p-4 bg-base-200 border-b border-base-300">
      <h1 class="text-xl font-bold">This is the thread title</h1>
    </div>
    <!-- Scrollable Main Content -->
     <ScrollableContent/>
  </div>
</div>
