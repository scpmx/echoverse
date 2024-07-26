<script lang="ts">
	import { boards } from "$lib/boards";
</script>

<div class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
	<div class="text-center">
        <h1 class="text-4xl font-bold mb-8">Boards</h1>
        <ul class="space-y-4 text-xl">
            {#each boards as { slug, name }}
                <li><a href="/boards/{slug}" class="hover:text-blue-500">{name}</a></li>
            {/each}
        </ul>
    </div>    
</div>