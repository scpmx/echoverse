<script>
	import { getPeer } from "$lib/client";
	import { Post, PostsDB } from "$lib/database";
	import { SearchRequest } from "@peerbit/document";


async function init() {
        var peer = await getPeer();

        var posts = await peer.open(new PostsDB());

        await posts.posts.put(new Post("Hello World"));

        var ps = await posts.posts.index.search(new SearchRequest());

        console.log(ps);
    }

</script>


<button onclick="{() => init()}">
    Click Me
</button>

<div class="bg-gray-100 text-gray-800">
	<div class="container mx-auto p-4">
		<div class="bg-white shadow-md rounded-lg p-4 mb-4">
			<div class="flex">
				<img src="https://i.imgur.com/W33X57A.jpeg" alt="Thread" class="w-64 h-64 object-cover mr-4" />
				<div>
					<h1 class="text-2xl font-bold mb-2">Thread Title</h1>
					<p class="text-gray-700">
						Thread description goes here. It can be a brief overview of the thread's topic or
						discussion. Thread description goes here. It can be a brief overview of the thread's topic or
						discussion. Thread description goes here. It can be a brief overview of the thread's topic or
						discussion. Thread description goes here. It can be a brief overview of the thread's topic or
						discussion. Thread description goes here.
					</p>
				</div>
			</div>
		</div>

        <!-- Replies -->
        {#each Array.from({length: 20}, (_, x) => x) as _}
            <div class="space-y-4">
                <div class="bg-white shadow-md rounded-lg p-4">
                    <div class="flex">
                        <img src="https://i.imgur.com/3nH7AWk.png" alt="Reply" class="w-32 h-32 object-cover mr-4" />
                        <div>
                            <div class="flex items-center mb-2">
                                <span class="text-gray-500 text-sm">Anonymous</span>
                                <span class="text-gray-400 text-sm mx-2">|</span>
                                <span class="text-gray-500 text-sm">07/25/2024 15:30</span>
                                <span class="text-gray-400 text-sm mx-2">|</span>
                                <span class="text-gray-500 text-sm">No.123456789</span>
                            </div>
                            <p class="text-gray-700">
                                Reply content goes here. This is the message left by the user in response to the thread.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}

	</div>
</div>
