export const DATABASE = {
  connection: process.env.MONGODB_URI || "mongodb://localhost/news-api-dev",
  debug: (process.env.DEBUG_MONGO !== "FALSE")
};
