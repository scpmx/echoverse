<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import MainContentHeader from "$lib/components/MainContentHeader.svelte";
  import MainContent from "$lib/components/MainContent.svelte";
  import { onMount } from "svelte";
  import { Peerbit } from "peerbit";
  import { ExampleStore, SimpleDocument } from "$lib/database";

  onMount(async () => {
    var peer = await Peerbit.create()
    var store = await peer.open(new ExampleStore())

    store.documents.events.addEventListener("change", async (evt) => {
        evt.detail.added.forEach(x => console.log(x.content));
    });

    await store.documents.put(
        new SimpleDocument({
            content: "Hello from " + peer.libp2p.peerId.toString(),
        }));
  });


</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex-1 flex flex-col">
     <MainContentHeader />
     <MainContent/>
  </div>
</div>
