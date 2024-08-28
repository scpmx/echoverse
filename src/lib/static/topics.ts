import { Topic } from "$lib/database";

export let topics: Topic[] = [
  // Interests
  new Topic("sci", "Science and Mathematics", "Interests"),
  new Topic("his", "History", "Interests"),
  new Topic("phy", "Philosophy", "Interests"),
  new Topic("nat", "Nature and Environment", "Interests"),
  new Topic("ast", "Astronomy", "Interests"),
  new Topic("psy", "Psychology", "Interests"),
  new Topic("eco", "Economics", "Interests"),

  // Creative
  new Topic("art", "Art and Design", "Creative"),
  new Topic("lit", "Literature", "Creative"),
  new Topic("fsh", "Fashion and Style", "Creative"),
  new Topic("hby", "Hobbies and Crafts", "Creative"),
  new Topic("ani", "Anime and Manga", "Creative"),
  new Topic("mus", "Music", "Creative"),
  new Topic("pho", "Photography", "Creative"),
  new Topic("wri", "Writing", "Creative"),

  // Technology
  new Topic("tech", "Technology", "Technology"),
  new Topic("aut", "Automobiles", "Technology"),
  new Topic("gam", "Gaming", "Technology"),
  new Topic("dev", "Development and Coding", "Technology"),
  new Topic("ai", "Artificial Intelligence", "Technology"),
  new Topic("rob", "Robotics", "Technology"),
  new Topic("cry", "Cryptocurrency", "Technology"),

  // Lifestyle
  new Topic("ent", "Entertainment", "Lifestyle"),
  new Topic("spt", "Sports", "Lifestyle"),
  new Topic("med", "Health and Medicine", "Lifestyle"),
  new Topic("food", "Food and Drink", "Lifestyle"),
  new Topic("tra", "Travel", "Lifestyle"),
  new Topic("fit", "Fitness and Nutrition", "Lifestyle"),
  new Topic("pet", "Pets and Animals", "Lifestyle"),
  new Topic("gar", "Gardening", "Lifestyle"),

  // Society
  new Topic("pol", "Politics", "Society"),
  new Topic("news", "Current Events", "Society"),
  new Topic("rel", "Religion and Spirituality", "Society"),
  new Topic("biz", "Business and Finance", "Society"),
  new Topic("edu", "Education", "Society"),
  new Topic("env", "Environmental Issues", "Society"),
  new Topic("soc", "Social Issues", "Society"),
  new Topic("law", "Law and Justice", "Society"),
];

export let topicsByTicker: Map<string, Topic> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic),
  new Map<string, Topic>()
);

export let topicNamesByTicker: Map<string, string> = topics.reduce(
  (acc, topic) => acc.set(topic.ticker, topic.name),
  new Map<string, string>()
);