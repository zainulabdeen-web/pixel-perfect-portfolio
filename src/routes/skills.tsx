import { createFileRoute } from "@tanstack/react-router";

import { SkillsPage } from "@/components/portfolio/PortfolioSite";

const title = "Skills & Technologies | Zain Ul Abdeen";
const description =
  "WordPress, WooCommerce, Elementor, PHP, JavaScript, SEO, performance optimization, and developer tools used by Zain Ul Abdeen.";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zainulabdeen.pro/skills" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zainulabdeen.pro/skills" }],
  }),
  component: SkillsPage,
});
