import type { Peerbit } from "peerbit";
import { Chat, Message, Topic } from "./database";
import { SearchRequest, StringMatch } from "@peerbit/document";
import { v4 } from "uuid";

type UIMessage = {
  id: string;
  name?: string;
  content: string;
  fromSelf: boolean;
};

export class ChatViewModel {
  private chat: Chat;
  private initialLoad: boolean;

  constructor(chat: Chat) {
    this.chat = chat;
    this.initialLoad = true;
  }

  messages = $state<UIMessage[]>([]);

  async start() {
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
    await this.chat.messages.put(new Message(
      new Date().toDateString(),
      content,
      name
    ));
  }
}

type UIChat = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
};

export class CatalogViewModel {
  private topic: Topic;
  private initialLoad: boolean;

  chats = $state<UIChat[]>([]);

  constructor(topic: Topic) {
    this.topic = topic;
    this.initialLoad = true;
  }

  async start() {
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

  async openChat(peer: Peerbit, chatId: string): Promise<ChatViewModel> {
    var [chat] = await this.topic.chats.index.search(
      new SearchRequest({
        query: [new StringMatch({ key: "id", value: chatId })],
      })
    );

    let openedChat = await peer.open(chat);

    return new ChatViewModel(openedChat);
  }

  async createChat(title: string, imageUrl: string, content: string, name: string): Promise<void> {
    await this.topic.chats.put(new Chat(
        v4(),
        new Date().toDateString(),
        title,
        imageUrl,
        content,
        name
    ));
  }

  getTicker(): string {
    return this.topic.ticker;
  }
}

export type TopicsRoute = {
  route: "topics";
};

export type CatalogRoute = {
  route: "catalog";
  viewModel: CatalogViewModel;
};

export type ChatRoute = {
  route: "chat";
  viewModel: ChatViewModel;
};

export type View = TopicsRoute | CatalogRoute | ChatRoute;

export class Controller {
  private peer: Peerbit;
  private catalogs: Map<string, CatalogViewModel>;
  private chats: Map<string, ChatViewModel>;

  view = $state<View>({ route: "topics" });

  constructor(peer: Peerbit) {
    this.peer = peer;
    this.chats = new Map<string, ChatViewModel>();
    this.catalogs = new Map<string, CatalogViewModel>();
  }

  async showChat(ticker: string, chatId: string) {
    let vm = this.chats.get(chatId);

    if (vm) {
      this.view = { route: "chat", viewModel: vm };
      return;
    }

    let catalogVm: CatalogViewModel;

    var savedCatalogVm = this.catalogs.get(ticker);
    if (savedCatalogVm) {
      catalogVm = savedCatalogVm;
    } else {
      let topic = await this.peer.open(new Topic(ticker));
      catalogVm = new CatalogViewModel(topic);
      this.catalogs.set(ticker, catalogVm);
    }

    let chatVm = await catalogVm.openChat(this.peer, chatId);
    this.chats.set(chatId, chatVm);

    this.view = { route: "chat", viewModel: chatVm };
  }

  async showCatalog(ticker: string) {
    var vm = this.catalogs.get(ticker);

    if (vm) {
      this.view = { route: "catalog", viewModel: vm };
      return;
    }

    let topic = await this.peer.open(new Topic(ticker));
    let catalogViewModel = new CatalogViewModel(topic);

    this.catalogs.set(ticker, catalogViewModel);
    this.view = { route: "catalog", viewModel: catalogViewModel };
  }

  showTopics() {
    this.view = { route: "topics" };
  }
}
