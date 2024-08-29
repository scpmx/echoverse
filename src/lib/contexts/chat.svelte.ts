import { Message, type Chat } from "$lib/database";
import type { PublicSignKey } from "@peerbit/crypto";
import { SearchRequest } from "@peerbit/document";
import type { Peerbit } from "peerbit";

type UIMessage = {
  id: string;
  content: string;
  date: Date;
  fromSelf: boolean;
  identifier: string;
};

export class ChatContext {
  private chat: Chat;
  private initialLoad: boolean;
  private opened: boolean;
  private signKey: PublicSignKey;
  private seenMessages: Set<string>;

  constructor(chat: Chat, signKey: PublicSignKey) {
    this.chat = chat;
    this.signKey = signKey;
    this.initialLoad = true;
    this.opened = false;
    this.seenMessages = new Set<string>();
  }

  messages = $state<UIMessage[]>([]);

  async listen() {
    if (this.initialLoad) {
      this.initialLoad = false;

      var ms = await this.chat.messages.index.search(new SearchRequest());
      var initialMessages = ms.map((x) => ({
        id: x.id,
        content: x.content,
        date: new Date(x.date),
        fromSelf: x.from.hashcode() == this.signKey.hashcode(),
        identifier: this.generateIdentifier(
          this.signKey,
          new Date(this.chat.date)
        ),
      }));

      initialMessages.forEach((x) => this.seenMessages.add(x.id));

      this.messages.push(...initialMessages);
      this.messages = this.messages.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );

      // Then subscribe to new changes
      this.chat.messages.events.addEventListener("change", (event) => {
        var newMessages = event.detail.added.map((x) => ({
          id: x.id,
          content: x.content,
          date: new Date(x.date),
          fromSelf: x.from.hashcode() === this.signKey.hashcode(),
          identifier: this.generateIdentifier(
            this.signKey,
            new Date(this.chat.date)
          ),
        }));

        for (let i = 0; i < newMessages.length; i++) {
          let msg = newMessages[i];
          if (!this.seenMessages.has(msg.id)) {
            this.messages.push(msg);
          }
        }
        this.messages = this.messages.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
      });
    }
  }

  // Called when chat is unpinned
  stop() {
    this.chat.messages.events.removeEventListener("change");
  }

  get title(): string {
    return this.chat.title;
  }

  get ticker(): string {
    return this.chat.ticker;
  }

  get imageUrl(): string {
    return this.chat.imageUrl;
  }

  get address(): string {
    return this.chat.address;
  }

  async addMessage(content: string) {
    const date = new Date();
    const message = new Message(this.signKey, date.toISOString(), content);
    await this.chat.messages.put(message);
  }

  async open(peer: Peerbit): Promise<void> {
    if (!this.opened) {
      this.opened = true;

      await peer.open(this.chat);

      // TODO: either make listen private or just move the implementation here
      await this.listen();
    }
  }

  private cyrb128(str: string) {
    let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
  }

  private sfc32(a: number, b: number, c: number, d: number) {
    return function () {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      let t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  private generateIdentifier(publicKey: PublicSignKey, date: Date): string {
    const seed = this.cyrb128(date.toISOString());
    const rand = this.sfc32(seed[0], seed[1], seed[2], seed[3]);

    const keyBytes = publicKey.bytes;
    const selectedBytes = new Uint8Array(8);
    const usedIndices = new Set<number>();

    for (let i = 0; i < 8; i++) {
      let index;
      do {
        index = Math.floor(rand() * keyBytes.length);
      } while (usedIndices.has(index));
      usedIndices.add(index);
      selectedBytes[i] = keyBytes[index];
    }

    return this.byteArrayToCustomAsciiString(Array.from(selectedBytes));
  }

  private byteArrayToCustomAsciiString(byteArray: number[]): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsetLength = charset.length;

    return byteArray
      .map((byte) => {
        const index = byte % charsetLength; // Map the byte to a valid index in the charset
        return charset.charAt(index);
      })
      .join("");
  }
}
