import type { Peerbit } from "peerbit";
import { CatalogContext } from "./contexts/catalog.svelte";
import { ChatContext } from "./contexts/chat.svelte";
import { Sidebar, Topic } from "./database";
import type { IContext } from "./interfaces/IContext";
import { SidebarContext } from "./contexts/sidebar.svelte";

type TopicsRoute = {
  route: "topics";
};

type CatalogRoute = {
  route: "catalog";
  catalog: CatalogContext;
};

type ChatRoute = {
  route: "chat";
  chat: ChatContext;
};

type AppView = TopicsRoute | CatalogRoute | ChatRoute;

export class AppController {

  private peer: Peerbit;

  // Ticker to catalog context
  private catalogs: Map<string, CatalogContext>;

  // ChatId to chat context
  private chats: Map<string, ChatContext>;

  mainContent = $state<AppView>({ route: "topics" });

  sidebarContext: SidebarContext
  
  constructor(peer: Peerbit) {
    this.peer = peer;
    this.chats = new Map<string, ChatContext>();
    this.catalogs = new Map<string, CatalogContext>();
    this.sidebarContext = new SidebarContext(new Sidebar(peer.identity.publicKey))
  }

  async initContext(context: IContext) {
    await context.open(this.peer);
  }

  async showChat(ticker: string, chatId: string): Promise<void> {
    let chatContext = this.chats.get(chatId);

    if (chatContext) {
      this.mainContent = { route: "chat", chat: chatContext };
      return;
    }

    let catalogContext: CatalogContext;

    var savedCatalogVm = this.catalogs.get(ticker);
    if (savedCatalogVm) {
        catalogContext = savedCatalogVm;
    } else {
      var topic = new Topic(ticker);
      catalogContext = new CatalogContext(topic);
      this.catalogs.set(ticker, catalogContext);
    }

    let ch = await catalogContext.getChat(chatId);
    let chatCtxt = new ChatContext(ch);
    this.chats.set(chatId, chatCtxt);

    this.mainContent = { route: "chat", chat: chatCtxt };
  }

  async showCatalog(ticker: string) {

    var vm = this.catalogs.get(ticker);

    if (vm) {
      this.mainContent = { route: "catalog", catalog: vm };
      return;
    }

    let topic = new Topic(ticker);
    let catalogContext = new CatalogContext(topic);

    this.catalogs.set(ticker, catalogContext);
    this.mainContent = { route: "catalog", catalog: catalogContext };
  }

  showTopics() {
    this.mainContent = { route: "topics" };
  }
}
