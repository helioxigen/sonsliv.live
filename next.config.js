const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // assetPrefix: isProd ? "/sonsliv.live/" : "",
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "/",
  },
};
