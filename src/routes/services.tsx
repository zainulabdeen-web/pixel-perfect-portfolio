import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/components/portfolio/PortfolioSite";

const title = "Services | WordPress, WooCommerce & SEO";
const description =
  "WordPress development, WooCommerce stores, Elementor pages, bug fixing, SEO, and website speed optimization services.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zainulabdeen.pro/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/services" }],
  }),
  component: ServicesPage,
});
