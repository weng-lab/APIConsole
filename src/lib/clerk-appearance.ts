export const clerkAppearance = {
  variables: {
    colorPrimary: "#1f1f1f",
    colorBackground: "#ffffff",
    colorText: "#222222",
    colorTextSecondary: "#6d6d6d",
    borderRadius: "4px",
    fontSize: "13px",
  },
  options: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
  },
  elements: {
    rootBox: {
      width: "100%",
    },
    card: {
      border: "none",
      boxShadow: "none",
      padding: 0,
      width: "100%",
    },
    cardBox: {
      border: "none",
      boxShadow: "none",
      width: "100%",
    },
    formButtonPrimary: {
      backgroundColor: "#1f1f1f",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.28)",
      fontSize: "13px",
      fontWeight: 500,
      minHeight: "38px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#111111",
      },
    },
    formFieldInput: {
      minHeight: "36px",
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
