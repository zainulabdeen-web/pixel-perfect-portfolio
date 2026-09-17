import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/portfolio/PortfolioSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Ul Abdeen | WordPress & WooCommerce Developer" },
      {
        name: "description",
        content:
          "Zain Ul Abdeen is a WordPress & WooCommerce Developer and Full Stack Web Developer specializing in WordPress development, Elementor, bug fixing, SEO, and website performance.",
      },
      { property: "og:title", content: "Zain Ul Abdeen | WordPress & WooCommerce Developer" },
      {
        property: "og:description",
        content:
          "WordPress, WooCommerce, Elementor, troubleshooting, SEO, and website performance services by Zain Ul Abdeen.",
      },
      { property: "og:url", content: "https://zainulabdeen.pro/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/" }],
  }),
  component: HomePage,
});
