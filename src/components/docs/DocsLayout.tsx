import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AppFooter } from "@/components/AppFooter";
import { docsSections } from "@/lib/docs";

type DocsLayoutProps = {
  activeHref: string;
  children: React.ReactNode;
  title: string;
};

export function DocsLayout({ activeHref, children, title }: DocsLayoutProps) {
  return (
    <>
      <Box
        component="main"
        sx={{ flex: 1, pb: { xs: 7, md: 12 }, pt: { xs: 5, md: 8 } }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: { lg: 1120 } }}>
          <Stack spacing={2.5}>
            <Stack spacing={0.5}>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                API Docs
              </Typography>
              <Typography color="text.secondary" variant="caption">
                Authenticated documentation for using the SCREEN GraphQL API.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2.5}
              sx={{ alignItems: "flex-start" }}
            >
              <Paper
                component="aside"
                sx={{
                  flexShrink: 0,
                  position: { md: "sticky" },
                  top: { md: 72 },
                  width: { xs: "100%", md: 260 },
                }}
              >
                <Stack spacing={2} sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700 }}>
                    Documentation
                  </Typography>
                  <Stack component="nav" spacing={1.75}>
                    {docsSections.map((section) => (
                      <Stack key={section.title} spacing={0.25}>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            px: 1.5,
                            textTransform: "uppercase",
                          }}
                        >
                          {section.title}
                        </Typography>
                        {section.items.map((item) => {
                          const active = item.href === activeHref;

                          return (
                            <Box
                              component="a"
                              href={item.href}
                              key={item.href}
                              sx={{
                                bgcolor: active ? "#eeeeee" : "transparent",
                                borderRadius: 1,
                                color: active ? "text.primary" : "text.secondary",
                                display: "block",
                                fontSize: "0.8125rem",
                                fontWeight: active ? 600 : 400,
                                px: 1.5,
                                py: 1,
                                textDecoration: "none",
                                "&:hover": {
                                  bgcolor: "#eeeeee",
                                  color: "text.primary",
                                },
                              }}
                            >
                              {item.title}
                            </Box>
                          );
                        })}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Paper>

              <Paper sx={{ borderRadius: 1, flex: 1, minWidth: 0, overflow: "hidden" }}>
                <Box
                  sx={{
                    borderBottom: "1px solid #dfdfdf",
                    px: { xs: 2.5, sm: 4 },
                    py: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                    {title}
                  </Typography>
                </Box>
                {children}
              </Paper>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <AppFooter />
    </>
  );
}
