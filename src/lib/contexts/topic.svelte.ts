import { Chat, type Topic } from "$lib/database";
import type { IContext } from "$lib/interfaces/IContext";
import { SearchRequest, StringMatch } from "@peerbit/document";
import type { Peerbit } from "peerbit";
import { v4 } from "uuid";

type UIChat = {
  id: string;
  ticker: string;
  title: string;
  imageUrl: string;
  content: string;
  address: string;
};

export class TopicContext implements IContext {

  private topic: Topic;
  private initialLoad: boolean;
  private opened: boolean;

  chats = $state<UIChat[]>([]);

  constructor(topic: Topic) {
    this.topic = topic;
    this.initialLoad = true;
    this.opened = false;
  }

  async open(peer: Peerbit): Promise<void> {
    if (!this.opened){
        this.opened = true;
        await peer.open(this.topic);
    }
  }

  async listen() {
    if (this.initialLoad) {
      this.initialLoad = false;

      let initialChats = await this.topic.chats.index.search(
        new SearchRequest()
      );

      let cs = initialChats.map((chat) => ({
        id: chat.id,
        ticker: chat.ticker,
        title: chat.title,
        imageUrl: chat.imageUrl,
        content: chat.content,
        address: chat.address
      }));

      this.chats.push(...cs);

      this.topic.chats.events.addEventListener("change", (event) => {
        let cs = event.detail.added.map((chat) => ({
          id: chat.id,
          ticker: chat.ticker,
          title: chat.title,
          imageUrl: chat.imageUrl,
          content: chat.content,
          address: chat.address
        }));
        this.chats.push(...cs);
      });
    }
  }

  async getChat(chatId: string): Promise<Chat> {

    var [chat] = await this.topic.chats.index.search(
      new SearchRequest({
        query: [new StringMatch({ key: "id", value: chatId })],
      })
    );

    return chat;
  }

  async createChat(
    ticker: string,
    title: string,
    imageUrl: string,
    content: string,
    name: string
  ): Promise<string> {
    var chat = new Chat(v4(), ticker, new Date().toDateString(), title, imageUrl, content, name)
    await this.topic.chats.put(chat);
    return chat.address;
  }

  get ticker(): string {
    return this.topic.ticker;
  }
}
