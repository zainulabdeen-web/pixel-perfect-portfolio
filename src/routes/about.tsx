import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/portfolio/PortfolioSite";

const title = "About Zain Ul Abdeen | WordPress Developer";
const description =
  "Learn about Zain Ul Abdeen, a WordPress, WooCommerce, and full stack web developer with 4+ years of experience building and optimizing websites.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zainulabdeen.pro/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/about" }],
  }),
  component: AboutPage,
});
