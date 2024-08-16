import type { Sidebar } from "$lib/database";
import type { IContext } from "$lib/interfaces/IContext";
import { SearchRequest } from "@peerbit/document";
import type { Peerbit } from "peerbit";
import { v4 } from "uuid";

export type SidebarChat = {
  id: string;
  ticker: string;
  chatId: string;
  title: string;
  hasUnreadMessages: boolean;
};

export class SidebarContext implements IContext {
  chats = $state<SidebarChat[]>([
    {
      id: v4(),
      ticker: "biz",
      chatId: v4(),
      title: "Best memecoins?",
      hasUnreadMessages: true,
    },
    {
      id: v4(),
      ticker: "biz",
      chatId: v4(),
      title: "Is eth washed?",
      hasUnreadMessages: false,
    },
    {
      id: v4(),
      ticker: "x",
      chatId: v4(),
      title: "Skinwalkers",
      hasUnreadMessages: false,
    },
    {
      id: v4(),
      ticker: "x",
      chatId: v4(),
      title: "UFO thread",
      hasUnreadMessages: true,
    },
    {
      id: v4(),
      ticker: "sci",
      chatId: v4(),
      title: "Advanced Arithmitic",
      hasUnreadMessages: false,
    },
    {
      id: v4(),
      ticker: "sci",
      chatId: v4(),
      title: "Cuckulus",
      hasUnreadMessages: false,
    },
  ]);

  private sidebar: Sidebar;
  private initialLoad: boolean;
  private opened: boolean;

  constructor(sidebar: Sidebar) {
    this.sidebar = sidebar;
    this.initialLoad = true;
    this.opened = false;
  }

  async listen() {
    if (this.initialLoad) {
      let pinnedChats = await this.sidebar.chats.index.search(
        new SearchRequest()
      );

      let chats: SidebarChat[] = pinnedChats.map((chat) => ({
        id: chat.id,
        ticker: chat.ticker,
        chatId: chat.chatId,
        title: "Test",
        hasUnreadMessages: false,
      }));

      this.chats.push(...chats);

      this.sidebar.chats.events.addEventListener("change", (event) => {
        let newChats: SidebarChat[] = event.detail.added.map((chat) => ({
          id: chat.id,
          ticker: chat.ticker,
          chatId: chat.chatId,
          title: "Test",
          hasUnreadMessages: false,
        }));

        this.chats.push(...newChats);

        let deletedChats = event.detail.removed.map((chat) => chat.id);

        this.chats = this.chats.filter((ch) => !deletedChats.includes(ch.id));
      });
    }
  }

  async open(peer: Peerbit) {
    if (!this.opened) {
      this.opened = true;
      await peer.open(this.sidebar);
    }
  }
}
