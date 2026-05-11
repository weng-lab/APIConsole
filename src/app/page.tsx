import Image from "next/image";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "grid",
        placeItems: "center",
        px: 2,
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="md" sx={{ maxWidth: 720 }}>
        <Stack
          spacing={4}
          sx={{
            "@keyframes homeIntro": {
              from: { opacity: 0, transform: "translateY(14px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              "& .home-intro": {
                animation: "none",
                opacity: 1,
                transform: "none",
              },
            },
          }}
        >
          <Stack
            className="home-intro"
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              animation: "homeIntro 480ms ease-out both",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Image
              src="/screen-logo.svg"
              alt="SCREEN"
              width={117}
              height={60}
              priority
            />
            <Box
              sx={{
                alignSelf: "stretch",
                bgcolor: "#cfcfcf",
                display: { xs: "none", sm: "block" },
                width: "1px",
              }}
            />
            <Typography
              component="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.25rem" },
                fontWeight: 750,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              API Console
            </Typography>
          </Stack>

          <Typography
            className="home-intro"
            sx={{
              animation: "homeIntro 560ms ease-out 100ms both",
              color: "text.secondary",
              fontSize: { xs: "1rem", sm: "1.125rem" },
              lineHeight: 1.7,
              maxWidth: 610,
            }}
          >
            Generate and manage API keys for the SCREEN API by the Weng and
            Moore Labs at UMass Chan.
          </Typography>

          <Stack
            className="home-intro"
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{
              alignItems: { xs: "stretch", sm: "center" },
              animation: "homeIntro 620ms ease-out 180ms both",
            }}
          >
            <Button
              href="/login"
              size="large"
              sx={{ px: 3 }}
              variant="contained"
            >
              Sign in to continue
            </Button>
            <Button href="/docs" size="large" sx={{ px: 3 }} variant="outlined">
              View docs
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
