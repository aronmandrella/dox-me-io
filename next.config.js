const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const GH_PAGE_SLUG = "/dox-me-io";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
    GitHub pages store website files under url that looks like this:
    https://username.github.io/repo-name/

    But Next.js vt default prepares absolute assets urls that expect that these assets are here:
    https://username.github.io/
  */
  basePath: IS_DEVELOPMENT ? "" : GH_PAGE_SLUG,
};

module.exports = nextConfig;
