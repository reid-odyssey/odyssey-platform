export const registry = {
  "odyssey-logo": {
    name: "odyssey-logo",
    type: "components:ui",
    files: ["src/components/ui/odyssey-logo.tsx"],
  },
  "project-card": {
    name: "project-card",
    type: "components:ui", 
    files: ["src/components/ui/project-card.tsx"],
  },
  "product-card": {
    name: "product-card",
    type: "components:ui",
    files: ["src/components/ui/product-card.tsx"],
  },
  "console-sidebar": {
    name: "console-sidebar",
    type: "components:ui",
    files: ["src/components/ui/console-sidebar.tsx"],
  },
  "console-header": {
    name: "console-header", 
    type: "components:ui",
    files: ["src/components/ui/console-header.tsx"],
  },
  "stats-card": {
    name: "stats-card",
    type: "components:ui",
    files: ["src/components/ui/stats-card.tsx"],
  },
} as const;

export type Registry = typeof registry;
export type RegistryEntry = Registry[keyof Registry];
