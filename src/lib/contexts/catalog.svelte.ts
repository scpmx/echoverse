import { Chat, type Topic } from "$lib/database";
import type { IContext } from "$lib/interfaces/IContext";
import { SearchRequest, StringMatch } from "@peerbit/document";
import type { Peerbit } from "peerbit";
import { v4 } from "uuid";

type UIChat = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
};

export class CatalogContext implements IContext {

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
        title: chat.title,
        imageUrl: chat.imageUrl,
        content: chat.content,
      }));

      this.chats.push(...cs);

      this.topic.chats.events.addEventListener("change", (event) => {
        let cs = event.detail.added.map((chat) => ({
          id: chat.id,
          title: chat.title,
          imageUrl: chat.imageUrl,
          content: chat.content,
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
    title: string,
    imageUrl: string,
    content: string,
    name: string
  ): Promise<void> {
    await this.topic.chats.put(
      new Chat(v4(), new Date().toDateString(), title, imageUrl, content, name)
    );
  }

  getTicker(): string {
    return this.topic.ticker;
  }
}
