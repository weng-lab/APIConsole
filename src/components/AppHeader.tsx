"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/AccountMenu";

const publicNavItems = [{ href: "/docs", label: "Docs" }];

const signedInNavItems = [
  { href: "/dashboard", label: "Dashboard" },
];

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
              sx={{
                color: "#a8a8a8",
                display: { xs: "none", md: "inline" },
                fontSize: "0.6875rem",
              }}
            >
              Weng · Moore Lab
            </Typography>
          </Stack>
        </Box>

        <Stack component="nav" direction="row" spacing={0.5} sx={{ display: "flex" }}>
          {publicNavItems.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Button
                color="inherit"
                component={Link}
                href={href}
                key={href}
                sx={{
                  bgcolor: active ? "rgba(255, 255, 255, 0.16)" : "transparent",
                  color: active ? "#ffffff" : "#d8d8d8",
                  minWidth: 0,
                  px: { xs: 1, sm: 1.5 },
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                  },
                }}
                variant="text"
              >
                {label}
              </Button>
            );
          })}
          <Show when="signed-in">
            {signedInNavItems.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Button
                  color="inherit"
                  component={Link}
                  href={href}
                  key={href}
                  sx={{
                    bgcolor: active ? "rgba(255, 255, 255, 0.16)" : "transparent",
                    color: active ? "#ffffff" : "#d8d8d8",
                    minWidth: 0,
                    px: { xs: 1, sm: 1.5 },
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                    },
                  }}
                  variant="text"
                >
                  {label}
                </Button>
              );
            })}
          </Show>
        </Stack>
        <Show when="signed-in">
          <AccountMenu />
        </Show>
        {pathname === "/login" ? null : (
          <Show when="signed-out">
            <Button component={Link} href="/login" variant="text" color="inherit">
              Sign in
            </Button>
          </Show>
        )}
      </Toolbar>
    </AppBar>
  );
}
