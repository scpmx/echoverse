<script lang="ts">
  import type { PinnedBoard } from "$lib/types";
  import CollapsibleThreadList from "./CollapsibleThreadList.svelte";
  import { pinnedBoards } from "$lib/state.svelte"
</script>

{#each pinnedBoards as board}
  <CollapsibleThreadList {board} />
{/each}
