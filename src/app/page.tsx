import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

const clerkAppearance = {
  variables: {
    colorPrimary: "#1f1f1f",
    colorPrimaryForeground: "#ffffff",
    colorBackground: "#ffffff",
    colorForeground: "#222222",
    colorMutedForeground: "#6d6d6d",
    colorInput: "#ffffff",
    colorInputForeground: "#222222",
    colorBorder: "#d0d0d0",
    colorRing: "#1f1f1f",
    colorShadow: "rgba(0, 0, 0, 0.18)",
    borderRadius: "6px",
    spacing: "1rem",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  options: {
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "blockButton" as const,
  },
  elements: {
    rootBox: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    cardBox: {
      width: "100%",
      maxWidth: "640px",
      border: "none",
      borderRadius: "10px",
      boxShadow: "none",
      padding: "clamp(2rem, 6vw, 4.5rem)",
    },
    headerTitle: {
      fontSize: "1.75rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    headerSubtitle: {
      color: "#6d6d6d",
      fontSize: "0.95rem",
    },
    formFieldLabel: {
      color: "#222222",
      fontSize: "1.05rem",
      fontWeight: 400,
    },
    formFieldInput: {
      minHeight: "50px",
      borderColor: "#cfcfcf",
      boxShadow: "none",
      fontSize: "1rem",
    },
    formButtonPrimary: {
      minHeight: "54px",
      backgroundColor: "#1f1f1f",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.28)",
      color: "#ffffff",
      fontSize: "1.05rem",
      fontWeight: 500,
      "&:hover, &:focus, &:active": {
        backgroundColor: "#111111",
      },
    },
    dividerLine: {
      backgroundColor: "#dddddd",
    },
    dividerText: {
      color: "#9d9d9d",
    },
    socialButtonsBlockButton: {
      minHeight: "52px",
      borderColor: "#dddddd",
      boxShadow: "none",
      color: "#222222",
      fontSize: "1rem",
    },
    socialButtonsBlockButtonText: {
      fontWeight: 500,
    },
    footerAction: {
      display: "none",
    },
    footerActionText: {
      display: "none",
    },
    footerActionLink: {
      display: "none",
    },
  },
};

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "grid",
        placeItems: "center",
        px: 2,
        py: { xs: 4, sm: 7 },
      }}
    >
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/dashboard"
        forceRedirectUrl="/dashboard"
        routing="hash"
        signUpFallbackRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
        signUpUrl="/"
        transferable
        withSignUp
      />
    </Box>
  );
}
