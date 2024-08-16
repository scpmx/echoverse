import { Topic } from "$lib/database";

export let topics: Topic[] = [
  new Topic("biz", "Business and Finance"),
  new Topic("sci", "Science and Mathematics"),
  new Topic("x", "Paranormal"),
  new Topic("v", "Videogames"),
  new Topic("b", "Random"),
  new Topic("k", "Weapons"),
  new Topic("wsg", "Worksafe GIF"),
  new Topic("mu", "Music"),
  new Topic("lit", "Literature")
];

export let topicsByTicker: Map<string, Topic> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic),
  new Map<string, Topic>()
);