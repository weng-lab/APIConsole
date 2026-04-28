import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
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
        py: { xs: 4, sm: 8 },
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: { xs: 2, sm: 4 } }}>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Stack spacing={1} sx={{ textAlign: "center" }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                API Console
              </Typography>
              <Typography color="text.secondary">
                Sign in or create an account to manage your API key.
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
      </Container>
    </Box>
  );
}
