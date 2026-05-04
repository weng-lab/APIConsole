"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/AccountMenu";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2, px: { xs: 3, sm: 4 } }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
            <Typography
              component={Link}
              href="/"
              sx={{
                color: "inherit",
                display: "inline-block",
                fontSize: "1.05rem",
                fontWeight: 700,
                lineHeight: 1,
                textDecoration: "none",
              }}
            >
              API Console
            </Typography>
            <Typography
              component="span"
              sx={{ color: "#a8a8a8", fontSize: "0.6875rem" }}
            >
              Weng · Moore Lab
            </Typography>
          </Stack>
        </Box>

        <Show when="signed-in">
          <AccountMenu />
        </Show>
        {pathname === "/" ? null : (
          <Show when="signed-out">
            <Button component={Link} href="/" variant="text" color="inherit">
              Sign in
            </Button>
          </Show>
        )}
      </Toolbar>
    </AppBar>
  );
}
