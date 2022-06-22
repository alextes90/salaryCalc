import type { GatsbyConfig } from "gatsby";
import { createProxyMiddleware } from "http-proxy-middleware";

const config: GatsbyConfig = {
  developMiddleware: app => {
    app.use(
      "/scripts",
      createProxyMiddleware({
        target: "https://www.centkantor.pl",
        changeOrigin: true,
        secure: false,
      })
    );
  },
  siteMetadata: {
    title: `Salary Calc`,
    description: "calc your netto by UOP",
    author: "MadaShindeInai",
    siteUrl: `https://salarycalc.gatsbyjs.io/`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

export default config;
