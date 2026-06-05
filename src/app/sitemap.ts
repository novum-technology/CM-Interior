import { MetadataRoute } from "next";
import { projects } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cminteriordesign.com";

  // Static routes sitemap items
  const staticRoutes = ["", "/about", "/services", "/gallery", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  // Dynamic project routes sitemap items
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/gallery/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
