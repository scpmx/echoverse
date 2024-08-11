import type { Topic } from "./database";

// Map from ticker to open topics program
export let topics = new Map<string, Topic>();