export type Chat = {
  id: string;
  title: string;
  hasUnreadMessages: boolean;
};

export type PinnedBoard = {
  ticker: string;
  name: string;
  chats: Chat[];
};

export class SidebarController {
  pinnedBoards = $state<PinnedBoard[]>([]);

  add(boardName: string, ticker: string, chatId: string, chatTitle: string) {
    var pinnedBoard = this.pinnedBoards.find((pb) => pb.ticker == ticker);

    if (pinnedBoard) {
        var existsAlready = pinnedBoard.chats.find(c => c.id == chatId);
        if (!existsAlready) {
            pinnedBoard.chats.push({id: chatId, title: chatTitle, hasUnreadMessages: true})
        }
    }
    else {
        this.pinnedBoards.push({ticker: ticker, name: boardName, chats: [{id: chatId, title: chatTitle, hasUnreadMessages: true }] });
    }
  }
}

export let sidebarController = new SidebarController();
