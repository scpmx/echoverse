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

      let initialChats = await this.topic.chats.index.search(
        new SearchRequest()
      );

      this.chats.push(...initialChats);

      this.topic.chats.events.addEventListener("change", (event) => {
        this.chats.push(...event.detail.added);
      });
    }
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
    return chat.address;
  }

  get ticker(): string {
    return this.topic.ticker;
  }
}
