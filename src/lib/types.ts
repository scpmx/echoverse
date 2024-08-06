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

export type ActiveThreadsPerBoard = {
  board: string;
  threads: Thread[];
};

export type ActiveBoards = {
  boards: ActiveThreadsPerBoard[];
};
