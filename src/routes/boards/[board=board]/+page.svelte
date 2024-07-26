<script lang="ts">

    import { page } from "$app/stores";

    import { v4 as uuid } from "uuid"

    let threads: { image: string, title: string, description: string, address: string }[] = [
        { image: "https://i.imgur.com/W33X57A.jpeg", title: "Thread 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/3nH7AWk.png", title: "Thread 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/GHDSzNv.jpeg", title: "Thread 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/qLs32a7.png", title: "Thread 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/emyDoks.jpeg", title: "Thread 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/38DZlXd.png", title: "Thread 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
        { image: "https://i.imgur.com/lMaQ0vP.jpeg", title: "Thread 7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", address: uuid() },
    ]

</script>

<div class="bg-gray-100 h-full">

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {#each threads as thread}
            <a href="/{$page.params["board"]}/{thread.address}" class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="{thread.image}" alt="" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold">{thread.title}</h3>
                    <p class="mt-2 text-gray-600">{thread.description}</p>
                </div>
            </a>
        {/each}

      </div>
    </div>
</div>