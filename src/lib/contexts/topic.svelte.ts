import { Chat, type Topic } from "$lib/database";
import type { PublicSignKey } from "@peerbit/crypto";
import { SearchRequest, StringMatch } from "@peerbit/document";
import { v4 } from "uuid";

export class TopicContext {
  private topic: Topic;
  private signKey: PublicSignKey;
  private initialLoad: boolean;

  chats = $state<Chat[]>([]);

  constructor(
    topic: Topic, 
    signKey: PublicSignKey
  ) {
    this.topic = topic;
    this.signKey = signKey;
    this.initialLoad = true;
  }

  async listen() {
    if (this.initialLoad) {
      this.initialLoad = false;

      // Load all existing chats
      await this.loadChats();

      // Listen for new chats
      this.topic.chats.events.addEventListener("change", async (event) => {
        // Add new chats
        for (const chat of event.detail.added) {
          if (!this.chats.some(c => c.address === chat.address)) {
            this.chats.push(chat);
          }
        }
        // Remove deleted chats
        for (const chat of event.detail.removed) {
          this.chats = this.chats.filter(c => c.address !== chat.address);
        }
      });
    }
  }

  async loadChats() {
    // Clear existing chats
    this.chats = [];

    // Load all chats
    const allChats = await this.topic.chats.index.search(new SearchRequest());
    this.chats.push(...allChats);
  }

  async createChat(
    ticker: string,
    title: string,
    imageUrl: string,
    content: string
  ): Promise<string> {
    var chat = new Chat(
      v4(),
      this.signKey,
      ticker,
      new Date().toISOString(),
      title,
      imageUrl,
      content
    );
    await this.topic.chats.put(chat);
    // Add the new chat to the local array
    this.chats.push(chat);
    return chat.address;
  }

  get ticker(): string {
    return this.topic.ticker;
  }
}
