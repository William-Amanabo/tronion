module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    target: "serverless",
    deviceSizes: [375, 480, 768, 1024, 1440, 1920],
  },
  env: {
    mongodburl:
      "mongodb+srv://William:psychic667@cluster0.8dq8k.mongodb.net/Tronion?retryWrites=true&w=majority",
  },
};
