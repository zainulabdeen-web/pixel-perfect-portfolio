import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/portfolio/PortfolioSite";

const title = "Contact Zain Ul Abdeen | WordPress Developer";
const description =
  "Get in touch about a WordPress website, WooCommerce store, bug fix, SEO, or performance project.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zainulabdeen.pro/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/contact" }],
  }),
  component: ContactPage,
});
