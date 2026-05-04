import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { clerkAppearance } from "@/lib/clerk-appearance";

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
      <Paper
        sx={{
          border: "none",
          borderRadius: 1,
          maxWidth: 486,
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 5 },
          width: "100%",
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
              API Console
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Manage your API keys for Weng-Moore lab web tools
            </Typography>
          </Stack>

          <SignIn
            appearance={clerkAppearance}
            fallbackRedirectUrl="/dashboard"
            forceRedirectUrl="/dashboard"
            routing="hash"
            signUpFallbackRedirectUrl="/dashboard"
            signUpForceRedirectUrl="/dashboard"
            withSignUp
          />
        </Stack>
      </Paper>
    </Box>
  );
}
