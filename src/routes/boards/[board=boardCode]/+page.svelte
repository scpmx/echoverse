<script lang="ts">

    import { page } from "$app/stores";
	import { getPeer } from "$lib/client";
	import { Board as DBBoard } from "$lib/database";
	import Board from "./Board.svelte";

    async function getBoard() {

        var peer = await getPeer();

        var board = await peer.open(new DBBoard($page.params.board));

        return board;
    }

</script>

{#await getBoard()}
    <p>Loading...</p>
{:then board} 
    <Board {board} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}