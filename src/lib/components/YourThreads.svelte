<script lang="ts">

    type Thread = {
        // id: string,
        name: string
    }

    type ActiveThreadsPerBoard = {
        board: string,
        threads: Thread[]
    }

    type ActiveBoards = {
        boards: ActiveThreadsPerBoard[]
    }

    let sampleData: ActiveBoards = {
        boards: [
            { board: "Business and Finance"
            , threads:
                [ { name: "Top 10 Emerging Markets to Watch in 2024" }
                , { name: "Cryptocurrency Regulations: What You Need to Know" }
                , { name: "How to Diversify Your Investment Portfolio" }
                , { name: "The Future of Remote Work and Its Economic Impact" }
                , { name: "Real Estate Trends: Investing in a Post-Pandemic World" }
                ]
            },
            { board: "Science and Mathematics"
            , threads:
                [ { name: "Breakthroughs in Quantum Computing: What Lies Ahead?" }
                , { name: "The Mathematics Behind Black Hole Theories" }
                , { name: "CRISPR: The Future of Genetic Engineering?" }
                , { name: "Understanding the Expanding Universe: New Theories" }
                , { name: "Mathematical Models Predicting Climate Change Outcomes" }
                ]
            },
            { board: "Paranormal"
            , threads:
                [ { name: "Haunted Locations: Share Your Creepiest Experiences" }
                , { name: "UFO Sightings: Government Disclosure Updates" }
                , { name: "Psychic Phenomena: Real or Just a Hoax?" }
                , { name: "The Science of Ghost Hunting: Tools and Techniques" }
                , { name: "Cryptids Around the World: Fact or Fiction?" }
                ]
            },
            { board: "Videogames"
            , threads:
                [ { name: "Top 10 Indie Games You Must Play in 2024" }
                , { name: "VR Gaming: The Next Big Thing or Just a Fad?" }
                , { name: "Speedrunning Techniques: Breaking the Limits" }
                , { name: "Esports Evolution: Where Are We Headed?" }
                , { name: "Game Design Tips from Industry Veterans" }
                ]
            },
            { board: "International"
            , threads:
                [ { name: "Global Economic Trends: Impact on Developing Nations" }
                , { name: "Cultural Festivals Around the World: 2024 Edition" }
                , { name: "Geopolitical Tensions: Analyzing Current Conflicts" }
                , { name: "Travel Tips for the Adventurous: Off the Beaten Path" }
                , { name: "International Trade Agreements: Recent Developments and Impacts" }
                ]
            },
        ]
    }

</script>

{#snippet ThreadsSnippet(activeThreads: ActiveThreadsPerBoard)}
    <div class="max-w-md mx-auto">
        <div class="p-4 rounded-t cursor-pointer">
            <h2 class="text-xl font-bold">{activeThreads.board}</h2>
        </div>
        <div id="threads" class="p-4 rounded-b">
            <ul>
                {#each activeThreads.threads as thread}
                    <li class="mb-2 ml-4">{thread.name}</li>
                {/each}
            </ul>
        </div>
    </div>
{/snippet}


{#each sampleData.boards as board}
    {@render ThreadsSnippet(board)}
{/each}