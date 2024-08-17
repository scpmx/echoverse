import { Message, type Chat } from "$lib/database";
import type { IContext } from "$lib/interfaces/IContext";
import type { PublicSignKey } from "@peerbit/crypto";
import { SearchRequest } from "@peerbit/document";
import type { Peerbit } from "peerbit";

type UIMessage = {
  id: string;
  name?: string;
  content: string;
  date: Date;
  fromSelf: boolean;
};

export class ChatContext implements IContext {
  private chat: Chat;
  private initialLoad: boolean;
  private opened: boolean;
  private signKey: PublicSignKey;

  constructor(
    chat: Chat,
    signKey: PublicSignKey
  ) {
    this.chat = chat;
    this.signKey = signKey;
    this.initialLoad = true;
    this.opened = false;
  }

  messages = $state<UIMessage[]>([]);

  async listen() {
    // On initial load, download all messages from db
    if (this.initialLoad) {
      this.initialLoad = false;
      var ms = await this.chat.messages.index.search(new SearchRequest());
      var initialMessages = ms.map((x) => ({
        id: x.id,
        name: x.name,
        content: x.content,
        date: new Date(x.date),
        fromSelf: x.from == this.signKey
      }));

      this.messages.push(...initialMessages);
      this.messages = this.messages.sort((a, b) => a.date.getTime() - b.date.getTime());

      // Then subscribe to new changes
      this.chat.messages.events.addEventListener("change", (event) => {
        var newMessages = event.detail.added.map((x) => ({
          id: x.id,
          name: x.name,
          content: x.content,
          date: new Date(x.date),
          fromSelf: x.from == this.signKey,
        }));

        // Todo: more sophisticated way of handling duplicates
        this.messages.push(...newMessages);
        this.messages = this.messages.sort((a, b) => a.date.getTime() - b.date.getTime());
      });
    }
  }

  // Called when chat is unpinned
  stop() {
    this.chat.messages.events.removeEventListener("change");
  }

  get title(): string {
    return this.chat.title;
  }

  get ticker(): string {
    return this.chat.ticker;
  }

  get imageUrl(): string {
    return this.chat.imageUrl;
  }

  get address(): string {
    return this.chat.address;
  }

  async addMessage(content: string, name: string) {
    await this.chat.messages.put(
      new Message(this.signKey, new Date().toISOString(), content, name)
    );
  }

  async open(peer: Peerbit): Promise<void> {
    if (!this.opened) {
      this.opened = true;
      await peer.open(this.chat);
    }
  }
}
