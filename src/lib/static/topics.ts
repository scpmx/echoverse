import { Topic } from "$lib/database";

export let topics: Topic[] = [
  new Topic("gen", "General Discussion"),
  new Topic("sci", "Science and Mathematics"),
  new Topic("pol", "Politics"),
  new Topic("tech", "Technology"),
  new Topic("art", "Art and Design"),
  new Topic("his", "History"),
  new Topic("lit", "Literature"),
  new Topic("news", "Current Events"),
  new Topic("ent", "Entertainment"),
  new Topic("phy", "Philosophy"),
  new Topic("rel", "Religion and Spirituality"),
  new Topic("spt", "Sports"),
  new Topic("biz", "Business and Finance"),
  new Topic("med", "Health and Medicine"),
  new Topic("edu", "Education"),
  new Topic("fsh", "Fashion and Style"),
  new Topic("aut", "Automobiles"),
  new Topic("hby", "Hobbies and Crafts"),
  new Topic("food", "Food and Drink"),
  new Topic("tra", "Travel"),
  new Topic("gam", "Gaming"),
  new Topic("ani", "Anime and Manga"),
  new Topic("nat", "Nature and Environment"),
  new Topic("dev", "Development and Coding"),
  new Topic("fit", "Fitness and Nutrition"),
];

export let topicsByTicker: Map<string, Topic> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic),
  new Map<string, Topic>()
);

export let topicNamesByTicker: Map<string, string> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic.name),
  new Map<string, string>()
);