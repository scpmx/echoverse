export type Chat = {
  // id: string,
  message: string;
  fromSelf: boolean;
};

export type Thread = {
  // id: string,
  name: string;
  hasUnreadMessages: boolean
};

export type WatchedThreads = {
  board: string;
  threads: Thread[];
};

export type WatchedBoards = {
  boards: WatchedThreads[];
};
