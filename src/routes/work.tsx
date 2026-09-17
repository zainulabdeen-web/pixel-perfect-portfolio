import { createFileRoute } from "@tanstack/react-router";

import { WorkPage } from "@/components/portfolio/PortfolioSite";

const title = "Portfolio & Work | Zain Ul Abdeen";
const description =
  "Selected WordPress, WooCommerce, Elementor, SEO, and website performance project work by Zain Ul Abdeen.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zainulabdeen.pro/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/work" }],
  }),
  component: WorkPage,
});
