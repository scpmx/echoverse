<script lang="ts">

    import { page } from "$app/stores";
	import { getBoard } from "$lib/client";
	import Board from "./Board.svelte";

    async function init() {

        var board = await getBoard($page.params.board);

        return board;
    }

</script>

{#await init()}
    <p>Loading...</p>
{:then board} 
    <Board {board} />
{:catch error}
    <p style="color: red;">board:</p>
	<p style="color: red">{error.message}</p>
    {console.log(error)}
{/await}