type Topic = {
  ticker: string;
  name: string;
};

export let topics: Topic[] = [
  { ticker: "biz", name: "Business and Finance" },
  { ticker: "sci", name: "Science and Mathematics" },
  { ticker: "x", name: "Paranormal" },
  { ticker: "v", name: "Videogames" },
  { ticker: "b", name: "Random" },
  { ticker: "k", name: "Weapons" },
  { ticker: "wsg", name: "Worksafe GIF" },
  { ticker: "mu", name: "Music" },
  { ticker: "lit", name: "Literature" },
];

let topicNamesByTicker: Map<string, string> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic.name),
  new Map<string, string>()
);

export function getTopicByTicker(ticker: string) : string {
    return topicNamesByTicker.get(ticker)!;
}
