import type { Peerbit } from "peerbit";
import { TopicContext } from "./contexts/topic.svelte";
import { ChatContext } from "./contexts/chat.svelte";
import { Chat, Sidebar } from "./database";
import type { IContext } from "./interfaces/IContext";
import { SidebarContext } from "./contexts/sidebar.svelte";
import { topicsByTicker } from "./static/topics";

type TopicsRoute = {
  route: "topics";
};

type TopicRoute = {
  route: "topic";
  topic: TopicContext;
};

type ChatRoute = {
  route: "chat";
  chat: ChatContext;
};

type AppView = TopicsRoute | TopicRoute | ChatRoute;

export class AppController {

  private peer: Peerbit;

  // Ticker to catalog context
  private topics: Map<string, TopicContext>;

  // address to chat context
  private chats: Map<string, ChatContext>;

  mainContent = $state<AppView>({ route: "topics" });

  sidebarContext: SidebarContext
  
  constructor(peer: Peerbit) {
    this.peer = peer;
    this.chats = new Map<string, ChatContext>();
    this.topics = new Map<string, TopicContext>();
    this.sidebarContext = new SidebarContext(new Sidebar(peer.identity.publicKey))
  }

  async init() {
    let openTopics = Object
      .keys(this.sidebarContext.tickers)
      .map(ticker => topicsByTicker.get(ticker))
      .filter(t => t != undefined);

      for (let i = 0; i < openTopics.length; i++) {
        var topic = await this.peer.open(openTopics[i])
        var context = new TopicContext(topic, this.peer.identity.publicKey);
        this.topics.set(topic.ticker, context);
      }
  }

  async initContext(context: IContext) {
    await context.open(this.peer);
  }

  async openChat(address: string): Promise<void> {
    var chatContext = this.chats.get(address);

    if (!chatContext) {
      var chat = await this.peer.open<Chat>(address);
      chatContext = new ChatContext(chat, this.peer.identity.publicKey);
      this.chats.set(address, chatContext);
    }

    this.mainContent = { route: "chat", chat: chatContext }
  }

  async openTopic(ticker: string) {
    var topicContext = this.topics.get(ticker);

    if (!topicContext) {
      let topic = topicsByTicker.get(ticker);
      if (topic) {
        await this.peer.open(topic);
        topicContext = new TopicContext(topic, this.peer.identity.publicKey);
        this.topics.set(ticker, topicContext);
      }
    }

    if (topicContext) {
      this.mainContent = { route: "topic", topic: topicContext }
    } else {
      console.error(`Topic '${ticker}' does not exist`);
    }
  }

  showTopics() {
    this.mainContent = { route: "topics" };
  }
}
