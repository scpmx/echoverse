<script lang="ts">
  import ReplyInput from "./ReplyInput.svelte";

  const conversation = [
    {
      message:
        "Hey, have you thought about where we should go for our vacation this year?",
      fromSelf: true,
    },
    {
      message:
        "Yeah, I was thinking we could visit Italy. It's been on my bucket list for a while.",
      fromSelf: false,
    },
    {
      message:
        "Italy sounds amazing! We could explore Rome, Venice, and Florence.",
      fromSelf: true,
    },
    {
      message:
        "Exactly! I've always wanted to see the Colosseum and the canals of Venice.",
      fromSelf: false,
    },
    {
      message:
        "And we can't forget about the food. Italian cuisine is the best!",
      fromSelf: true,
    },
    {
      message: "Absolutely! We should also visit some vineyards in Tuscany.",
      fromSelf: false,
    },
    {
      message:
        "That's a great idea. I'll start looking into flights and accommodations.",
      fromSelf: true,
    },
    {
      message:
        "Perfect, I'll check out some tour packages and local attractions.",
      fromSelf: false,
    },
    { message: "We're going to have an amazing trip!", fromSelf: true },
    {
      message: "I can't wait! Let's make a list of places we want to visit.",
      fromSelf: false,
    },
    {
      message: "Good idea. What's the top spot you want to see in Rome?",
      fromSelf: true,
    },
    {
      message: "The Colosseum, for sure. It's such an iconic landmark.",
      fromSelf: false,
    },
    {
      message:
        "Definitely. I also want to visit the Vatican and see the Sistine Chapel.",
      fromSelf: true,
    },
    {
      message: "Oh yes, the artwork there is incredible. How about Venice?",
      fromSelf: false,
    },
    {
      message: "We have to take a gondola ride through the canals.",
      fromSelf: true,
    },
    {
      message: "Agreed! And we should see St. Mark's Basilica.",
      fromSelf: false,
    },
    {
      message:
        "Florence is all about the art and architecture. The Uffizi Gallery is a must-see.",
      fromSelf: true,
    },
    {
      message:
        "For sure, and the Florence Cathedral too. The view from the dome is supposed to be amazing.",
      fromSelf: false,
    },
    {
      message:
        "This trip is going to be so packed with activities. We should also plan some downtime to just relax and enjoy the scenery.",
      fromSelf: true,
    },
    {
      message:
        "Absolutely, maybe a day at a beach or a quiet afternoon at a café.",
      fromSelf: false,
    },
    {
      message: "Yes! Sipping espresso in an Italian café sounds perfect.",
      fromSelf: true,
    },
    {
      message: "It really does. I'm getting excited just thinking about it!",
      fromSelf: false,
    },
    {
      message: "Me too! I'll send you some flight options tonight.",
      fromSelf: true,
    },
    {
      message:
        "Great, I'll do some research on places to stay. Talk to you later!",
      fromSelf: false,
    },
    { message: "Talk to you later!", fromSelf: true },
  ];
</script>

<!-- TODO: Populate with real thread title -->
<svelte:head>
    <title>This is the thread title</title>
</svelte:head>

{#each conversation as chat}
  {#if chat.fromSelf}
    <div class="chat chat-end">
      <div class="chat-bubble">
        <div class="max-w-72">
          {chat.message}
        </div>
      </div>
    </div>
  {:else}
    <div class="chat chat-start">
      <div class="chat-bubble">
        <div class="max-w-72">
          {chat.message}
        </div>
      </div>
    </div>
  {/if}
{/each}

<!-- Padding -->
<div class="h-32 w-full"></div>

<ReplyInput />