"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/AccountMenu";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              color: "inherit",
              display: "inline-block",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            API Console
          </Typography>
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
