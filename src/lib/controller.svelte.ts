import type { Peerbit } from "peerbit";
import { TopicContext } from "./contexts/topic.svelte";
import { ChatContext } from "./contexts/chat.svelte";
import { Chat, Sidebar, Topic } from "./database";
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

  // Address to catalog context
  private topics: Map<string, TopicContext>;

  // Address to chat context
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
        var topic = await this.peer.open(openTopics[i], { args: { replicate: { factor: 1 } }})
        var context = new TopicContext(topic, this.peer.identity.publicKey);
        this.topics.set(topic.ticker, context);
      }

      await this.sidebarContext.open(this.peer);
  }

  async loadChatFromAddress(address: string): Promise<void> {
    var chatContext = this.chats.get(address);

    if (!chatContext) {
      try {
        var chat = await this.peer.open<Chat>(address, { args: { replicate: { factor: 1 } }});
        chatContext = new ChatContext(chat, this.peer.identity.publicKey);
        this.chats.set(chat.address, chatContext);
        
        // Add the chat to the sidebar
        await this.sidebarContext.add(chat.ticker, chat.title, chat.address);
      } catch (ex) {
        console.error(ex);
        return;
      }
    }

    await chatContext.listen();
    this.mainContent = { route: "chat", chat: chatContext };
  }

  async openChat(chat: Chat): Promise<void> {
    try {
      await this.peer.open(chat, { args: { replicate: { factor: 1 } }});
    } catch {
      console.log("chat already opened");
    }

    let chatContext = this.chats.get(chat.address);

    if (!chatContext) {
      chatContext = new ChatContext(chat, this.peer.identity.publicKey);
      this.chats.set(chat.address, chatContext);
      
      // Add the chat to the sidebar
      await this.sidebarContext.add(chat.ticker, chat.title, chat.address);
    }

    await chatContext.listen();
    this.mainContent = { route: "chat", chat: chatContext }
  }

  async openTopic(topic: Topic) {

    if (topic.closed) {
      await this.peer.open(topic, { args: { replicate: { factor: 1 } }});
    }

    var topicContext = this.topics.get(topic.address);

    if (!topicContext) {
      topicContext = new TopicContext(topic, this.peer.identity.publicKey);
      this.topics.set(topic.address, topicContext);
    }

    await topicContext.listen();
    this.mainContent = { route: "topic", topic: topicContext }
  }

  showTopics() {
    this.mainContent = { route: "topics" };
  }
}
