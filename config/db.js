export const DATABASE = {
  connection: process.env.MONGODB_URI || "mongodb://localhost/news-api",
  debug: (process.env.DEBUG_MONGO !== "FALSE")
};
