import { PinnedChat, type Sidebar } from "$lib/database";
import { SearchRequest } from "@peerbit/document";
import type { Peerbit } from "peerbit";

export type SidebarChat = {
  id: string;
  ticker: string;
  address: string;
  title: string;
  hasUnreadMessages: boolean;
};

export class SidebarContext {
    
  chats = $state<SidebarChat[]>([]);

  private groupByTicker = (
    chats: SidebarChat[]
  ): Record<string, SidebarChat[]> => {
    return chats.reduce(
      (acc, chat) => {
        if (!acc[chat.ticker]) {
          acc[chat.ticker] = [];
        }
        acc[chat.ticker].push(chat);
        return acc;
      },
      {} as Record<string, SidebarChat[]>
    );
  };

  tickers = $derived(this.groupByTicker(this.chats))

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
        address: chat.address,
        title: chat.title,
        hasUnreadMessages: false,
      }));

      this.chats.push(...chats);

      this.sidebar.chats.events.addEventListener("change", (event) => {
        let newChats: SidebarChat[] = event.detail.added.map((chat) => ({
          id: chat.id,
          ticker: chat.ticker,
          address: chat.address,
          title: chat.title,
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

      // TODO: Either make listen private or move it to this method
      await this.listen();
    }
  }

  async add(ticker: string, title: string, address: string) {
    await this.sidebar.chats.put(new PinnedChat(ticker, title, address));
  }
}
