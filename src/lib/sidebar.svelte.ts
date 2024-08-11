import type { ChatRoute } from "./navigation.svelte";

export type Chat = {
    route: ChatRoute
    name: string;
    hasUnreadMessages: boolean,
  };
  
  export type PinnedBoard = {
    name: string;
    chats: Chat[];
  };
  
  export class SidebarController {
    pinnedBoards = $state<PinnedBoard[]>([]);
  }
  
  export let sidebarController = new SidebarController();