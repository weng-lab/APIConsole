"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { ApiKeysTable } from "@/components/ApiKeysTable";

type ApiKey = {
  name?: string;
  keyValue: string;
  createdAt: string;
};

export function Dashboard() {
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApiKey() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/api-key");

        if (!response.ok) {
          setError("Could not load your API key.");
          return;
        }

        const data: { apiKey: ApiKey | null } = await response.json();
        setApiKey(data.apiKey);
      } catch {
        setError("Could not load your API key.");
      } finally {
        setLoading(false);
      }
    }

    loadApiKey();
  }, []);

  async function createApiKey() {
    setCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/api-key", { method: "POST" });

      if (!response.ok) {
        setError("Could not create your API key.");
        return;
      }

      const data: { apiKey: ApiKey } = await response.json();
      setApiKey(data.apiKey);
    } catch {
      setError("Could not create your API key.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteApiKey() {
    setDeleting(true);
    setError(null);

    try {
      const response = await fetch("/api/api-key", { method: "DELETE" });

      if (!response.ok) {
        setError("Could not delete your API key.");
        return;
      }

      setApiKey(null);
    } catch {
      setError("Could not delete your API key.");
    } finally {
      setDeleting(false);
    }
  }

  const actionDisabled = loading || creating || deleting || Boolean(apiKey);

  return (
    <Box
      component="main"
      sx={{ flex: 1, pb: { xs: 7, md: 12 }, pt: { xs: 5, md: 8 } }}
    >
      <Container maxWidth="lg" sx={{ maxWidth: { lg: 1120 } }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "stretch", sm: "flex-end" },
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={0.5}>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                API Keys
              </Typography>
              <Typography color="text.secondary" variant="caption">
                Create and manage the keys used to access the API. Each key is
                active for 90 days only
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="medium"
              startIcon={<AddOutlined />}
              onClick={createApiKey}
              disabled={actionDisabled}
              sx={{
                alignSelf: { xs: "stretch", sm: "auto" },
                minHeight: 40,
                minWidth: 160,
                px: 2.5,
              }}
            >
              {creating ? "Creating..." : "Create New Key"}
            </Button>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Paper sx={{ border: "none", borderRadius: 1, overflow: "hidden" }}>
            <ApiKeysTable
              apiKey={apiKey}
              loading={loading}
              deleting={deleting}
              onDelete={deleteApiKey}
            />
          </Paper>

          <Typography align="center" color="text.secondary" variant="caption">
            Treat your API keys like your password. Don&apos;t commit it to
            source control or share it client side
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
