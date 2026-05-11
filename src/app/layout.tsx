import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Box } from "@mui/material";
import { AppHeader } from "@/components/AppHeader";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Console",
  description: "Generate and manage API keys for the SCREEN API.",
};

const clerkLocalization = {
  signIn: {
    start: {
      title: "API Console",
      subtitle: "Sign in or create an account to manage your API keys.",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={clerkLocalization}>
      <html lang="en">
        <body>
          <Providers>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
              }}
            >
              <AppHeader />
              {children}
            </Box>
            <Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
