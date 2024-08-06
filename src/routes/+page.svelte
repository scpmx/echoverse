<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import ScrollableContent from "$lib/components/ScrollableContent.svelte";
  import ScrollableContentHeader from "$lib/components/ScrollableContentHeader.svelte";
</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex-1 flex flex-col">
     <ScrollableContentHeader />
     <ScrollableContent/>
  </div>
</div>
