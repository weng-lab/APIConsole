import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { clerkAppearance } from "@/components/ClerkAppearance";

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
