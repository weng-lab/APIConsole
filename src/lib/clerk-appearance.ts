export const clerkAppearance = {
  variables: {
    colorPrimary: "#111827",
    colorBackground: "#ffffff",
    borderRadius: "12px",
  },
  options: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "blockButton",
  },
  elements: {
    card: {
      border: "none",
      boxShadow: "none",
    },
    cardBox: {
      border: "none",
      boxShadow: "none",
    },
    footer: {
      background: "transparent",
    },
    headerSubtitle: {
      display: "none",
    },
    headerTitle: {
      display: "none",
    },
  },
} as const;
