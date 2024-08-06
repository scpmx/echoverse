<script lang="ts">
    import type { WatchedBoards } from '$lib/types';
    import CollapsibleThreadList from './CollapsibleThreadList.svelte';

    let sampleData: WatchedBoards = {
        boards: [
            { board: "Business and Finance"
            , threads:
                [ { name: "Top 10 Emerging Markets to Watch in 2024", hasUnreadMessages: false }
                , { name: "Cryptocurrency Regulations: What You Need to Know", hasUnreadMessages: false }
                , { name: "How to Diversify Your Investment Portfolio", hasUnreadMessages: false }
                , { name: "The Future of Remote Work and Its Economic Impact", hasUnreadMessages: true }
                , { name: "Real Estate Trends: Investing in a Post-Pandemic World", hasUnreadMessages: false }
                ]
            },
            { board: "Science and Mathematics"
            , threads:
                [ { name: "Breakthroughs in Quantum Computing: What Lies Ahead?", hasUnreadMessages: false }
                , { name: "The Mathematics Behind Black Hole Theories", hasUnreadMessages: true }
                , { name: "CRISPR: The Future of Genetic Engineering?", hasUnreadMessages: true }
                , { name: "Understanding the Expanding Universe: New Theories", hasUnreadMessages: false }
                , { name: "Mathematical Models Predicting Climate Change Outcomes", hasUnreadMessages: false }
                ]
            },
            { board: "Paranormal"
            , threads:
                [ { name: "Haunted Locations: Share Your Creepiest Experiences", hasUnreadMessages: true }
                , { name: "UFO Sightings: Government Disclosure Updates", hasUnreadMessages: false }
                , { name: "Psychic Phenomena: Real or Just a Hoax?", hasUnreadMessages: false }
                , { name: "The Science of Ghost Hunting: Tools and Techniques", hasUnreadMessages: true }
                , { name: "Cryptids Around the World: Fact or Fiction?", hasUnreadMessages: false }
                ]
            },
            { board: "Videogames"
            , threads:
                [ { name: "Top 10 Indie Games You Must Play in 2024", hasUnreadMessages: false }
                , { name: "VR Gaming: The Next Big Thing or Just a Fad?", hasUnreadMessages: false }
                , { name: "Speedrunning Techniques: Breaking the Limits", hasUnreadMessages: false }
                , { name: "Esports Evolution: Where Are We Headed?", hasUnreadMessages: false }
                , { name: "Game Design Tips from Industry Veterans", hasUnreadMessages: false }
                ]
            },
            { board: "International"
            , threads:
                [ { name: "Global Economic Trends: Impact on Developing Nations", hasUnreadMessages: true }
                , { name: "Cultural Festivals Around the World: 2024 Edition", hasUnreadMessages: true }
                , { name: "Geopolitical Tensions: Analyzing Current Conflicts", hasUnreadMessages: true }
                , { name: "Travel Tips for the Adventurous: Off the Beaten Path", hasUnreadMessages: true }
                , { name: "International Trade Agreements: Recent Developments and Impacts", hasUnreadMessages: true }
                ]
            },
        ]
    }

</script>


{#each sampleData.boards as board}
    <CollapsibleThreadList activeThreads={board} />
{/each}