import type { Chat, PinnedBoard } from "./types";
import { pushState } from "$app/navigation";


// let sampleData: PinnedBoard[] = [
//   {
//     name: "Business and Finance",
//     threads: [
//       {
//         name: "Top 10 Emerging Markets to Watch in 2024",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Cryptocurrency Regulations: What You Need to Know",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "How to Diversify Your Investment Portfolio",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "The Future of Remote Work and Its Economic Impact",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Real Estate Trends: Investing in a Post-Pandemic World",
//         hasUnreadMessages: false,
//       },
//     ],
//   },
//   {
//     name: "Science and Mathematics",
//     threads: [
//       {
//         name: "Breakthroughs in Quantum Computing: What Lies Ahead?",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "The Mathematics Behind Black Hole Theories",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "CRISPR: The Future of Genetic Engineering?",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Understanding the Expanding Universe: New Theories",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Mathematical Models Predicting Climate Change Outcomes",
//         hasUnreadMessages: false,
//       },
//     ],
//   },
//   {
//     name: "Paranormal",
//     threads: [
//       {
//         name: "Haunted Locations: Share Your Creepiest Experiences",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "UFO Sightings: Government Disclosure Updates",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Psychic Phenomena: Real or Just a Hoax?",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "The Science of Ghost Hunting: Tools and Techniques",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Cryptids Around the World: Fact or Fiction?",
//         hasUnreadMessages: false,
//       },
//     ],
//   },
//   {
//     name: "Videogames",
//     threads: [
//       {
//         name: "Top 10 Indie Games You Must Play in 2024",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "VR Gaming: The Next Big Thing or Just a Fad?",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Speedrunning Techniques: Breaking the Limits",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Esports Evolution: Where Are We Headed?",
//         hasUnreadMessages: false,
//       },
//       {
//         name: "Game Design Tips from Industry Veterans",
//         hasUnreadMessages: false,
//       },
//     ],
//   },
//   {
//     name: "International",
//     threads: [
//       {
//         name: "Global Economic Trends: Impact on Developing Nations",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Cultural Festivals Around the World: 2024 Edition",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Geopolitical Tensions: Analyzing Current Conflicts",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "Travel Tips for the Adventurous: Off the Beaten Path",
//         hasUnreadMessages: true,
//       },
//       {
//         name: "International Trade Agreements: Recent Developments and Impacts",
//         hasUnreadMessages: true,
//       },
//     ],
//   },
// ];

// const conversation: Chat[] = [
//     {
//       message:
//         "Hey, have you thought about where we should go for our vacation this year?",
//       fromSelf: true,
//     },
//     {
//       message:
//         "Yeah, I was thinking we could visit Italy. It's been on my bucket list for a while.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "Italy sounds amazing! We could explore Rome, Venice, and Florence.",
//       fromSelf: true,
//     },
//     {
//       message:
//         "Exactly! I've always wanted to see the Colosseum and the canals of Venice.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "And we can't forget about the food. Italian cuisine is the best!",
//       fromSelf: true,
//     },
//     {
//       message: "Absolutely! We should also visit some vineyards in Tuscany.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "That's a great idea. I'll start looking into flights and accommodations.",
//       fromSelf: true,
//     },
//     {
//       message:
//         "Perfect, I'll check out some tour packages and local attractions.",
//       fromSelf: false,
//     },
//     { message: "We're going to have an amazing trip!", fromSelf: true },
//     {
//       message: "I can't wait! Let's make a list of places we want to visit.",
//       fromSelf: false,
//     },
//     {
//       message: "Good idea. What's the top spot you want to see in Rome?",
//       fromSelf: true,
//     },
//     {
//       message: "The Colosseum, for sure. It's such an iconic landmark.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "Definitely. I also want to visit the Vatican and see the Sistine Chapel.",
//       fromSelf: true,
//     },
//     {
//       message: "Oh yes, the artwork there is incredible. How about Venice?",
//       fromSelf: false,
//     },
//     {
//       message: "We have to take a gondola ride through the canals.",
//       fromSelf: true,
//     },
//     {
//       message: "Agreed! And we should see St. Mark's Basilica.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "Florence is all about the art and architecture. The Uffizi Gallery is a must-see.",
//       fromSelf: true,
//     },
//     {
//       message:
//         "For sure, and the Florence Cathedral too. The view from the dome is supposed to be amazing.",
//       fromSelf: false,
//     },
//     {
//       message:
//         "This trip is going to be so packed with activities. We should also plan some downtime to just relax and enjoy the scenery.",
//       fromSelf: true,
//     },
//     {
//       message:
//         "Absolutely, maybe a day at a beach or a quiet afternoon at a café.",
//       fromSelf: false,
//     },
//     {
//       message: "Yes! Sipping espresso in an Italian café sounds perfect.",
//       fromSelf: true,
//     },
//     {
//       message: "It really does. I'm getting excited just thinking about it!",
//       fromSelf: false,
//     },
//     {
//       message: "Me too! I'll send you some flight options tonight.",
//       fromSelf: true,
//     },
//     {
//       message:
//         "Great, I'll do some research on places to stay. Talk to you later!",
//       fromSelf: false,
//     },
//     { message: "Talk to you later!", fromSelf: true },
//   ];

export let pinnedBoards = $state<PinnedBoard[]>([]);

export let messages = $state<Chat[]>([]);
