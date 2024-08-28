module.exports = {
  env: {
    API_KEY: process.env.CUSTOM_API_KEY,
    NEXT_ENV:
      process.env.NEXT_ENV === "localhost" ? "localhost" : "development",
  },
};
