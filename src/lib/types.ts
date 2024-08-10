export type Chat = {
  // id: string,
  message: string;
  fromSelf: boolean;
};

export type Thread = {
  // id: string,
  name: string;
  hasUnreadMessages: boolean,
  chat: Chat[]
};

export type PinnedBoard = {
  name: string;
  threads: Thread[];
};