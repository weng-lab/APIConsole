import { Box, Container, Divider, Stack, Typography } from "@mui/material";

const footerLinks = ["Weng Lab", "Moore Lab"];

export function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1f1f1f",
        color: "#f4f4f4",
        pb: 2,
        pt: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg" sx={{ maxWidth: { lg: 1120 } }}>
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 12 }}
          >
            <Stack spacing={1} sx={{ maxWidth: 300 }}>
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 700 }}>
                API Console
              </Typography>
              <Typography sx={{ color: "#c8c8c8", fontSize: "0.8125rem" }}>
                Manage your API keys for Weng-Moore lab web tools.
              </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.95rem", fontWeight: 700 }}>
                About us
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 6 }}
                sx={{ color: "#c8c8c8", fontSize: "0.8125rem" }}
              >
                {footerLinks.map((label) => (
                  <Box component="span" key={label}>
                    {label}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.14)" }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              color: "#9d9d9d",
              fontSize: "0.75rem",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption">
              Copyright © Weng Lab, Moore Lab 2025.
            </Typography>
            <Stack direction="row" spacing={{ xs: 3, sm: 8 }}>
              <Typography component="a" href="#" variant="caption">
                Privacy & Policy
              </Typography>
              <Typography component="a" href="#" variant="caption">
                Terms & Condition
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
