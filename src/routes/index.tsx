import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";
import { Toaster } from "@/components/ui/sonner";

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
          "Zain Ul Abdeen is a WordPress & WooCommerce Developer and Full Stack Web Developer specializing in WordPress development, Elementor, bug fixing, SEO, and website performance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Portfolio />
      <Toaster theme="dark" position="top-right" />
    </>
  );
}
