/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};

module.exports = withPlugins([withSvgr], nextConfig);
