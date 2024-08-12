import type { Peerbit } from "peerbit";
import type { Chat, Topic } from "./database";
import type { ChatRoute } from "./navigation.svelte";

// Map from ticker to open topics program
export let topics = new Map<string, Topic>();

// Map from chat id to open chat program
export let chats = new Map<string, Chat>();