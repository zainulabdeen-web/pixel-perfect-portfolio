import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Ul Abdeen — Freelance Web Developer & Digital Solutions Expert" },
      {
        name: "description",
        content:
          "Freelance Web Developer specializing in React JS, WordPress, SEO, and B2B lead generation. Building fast, responsive websites that convert.",
      },
      { property: "og:title", content: "Zain Ul Abdeen — Freelance Web Developer & Digital Solutions Expert" },
      {
        property: "og:description",
        content:
          "React JS · WordPress Expert · SEO Specialist · Lead Generation Expert. Helping businesses build websites that generate quality leads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
