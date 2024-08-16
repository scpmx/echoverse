import { Message, type Chat } from "$lib/database";
import type { IContext } from "$lib/interfaces/IContext";
import { SearchRequest } from "@peerbit/document";
import type { Peerbit } from "peerbit";

type UIMessage = {
  id: string;
  name?: string;
  content: string;
  fromSelf: boolean;
};

export class ChatContext implements IContext {
  private chat: Chat;
  private initialLoad: boolean;
  private opened: boolean;

  constructor(chat: Chat) {
    this.chat = chat;
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
        fromSelf: false,
      }));

      this.messages.push(...initialMessages);

      // Then subscribe to new changes
      this.chat.messages.events.addEventListener("change", (event) => {
        var newMessages = event.detail.added.map((x) => ({
          id: x.id,
          name: x.name,
          content: x.content,
          fromSelf: false,
        }));

        // Todo: more sophisticated way of handling duplicates
        this.messages.push(...newMessages);
      });
    }
  }

  // Called when chat is unpinned
  stop() {
    this.chat.messages.events.removeEventListener("change");
  }

  getTitle() {
    return this.chat.title;
  }

  async addMessage(content: string, name: string) {
    await this.chat.messages.put(
      new Message(new Date().toDateString(), content, name)
    );
  }

  async open(peer: Peerbit): Promise<void> {
    if (!this.opened) {
      this.opened = true;
      await peer.open(this.chat);
    }
  }
}
