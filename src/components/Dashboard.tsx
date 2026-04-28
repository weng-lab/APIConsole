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

  const hasKey = Boolean(apiKey);
  const actionDisabled = loading || creating || deleting || hasKey;

  return (
    <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "flex-start", sm: "flex-end" },
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<AddOutlined />}
              onClick={createApiKey}
              disabled={actionDisabled}
            >
              {hasKey ? "Limit reached" : creating ? "Creating…" : "New key"}
            </Button>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Paper>
            <ApiKeysTable
              apiKey={apiKey}
              loading={loading}
              deleting={deleting}
              onDelete={deleteApiKey}
            />
          </Paper>

          <Typography align="center" color="text.secondary" variant="body2">
            Treat your secret key like a password. Don&apos;t commit it to
            source control or share it client-side.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
