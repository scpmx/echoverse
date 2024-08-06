<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import MainContentHeader from "$lib/components/MainContentHeader.svelte";
  import MainContent from "$lib/components/MainContent.svelte";
</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex-1 flex flex-col">
     <MainContentHeader />
     <MainContent/>
  </div>
</div>
