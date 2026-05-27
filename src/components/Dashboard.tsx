"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
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
import { OnboardingSurveyDialog } from "@/components/OnboardingSurveyDialog";

type ApiKey = {
  name?: string;
  keyValue: string;
  createdAt: string;
  expiresAt: string;
  expired: boolean;
};

type ApiKeyResponse = Omit<ApiKey, "expired">;

const apiGatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL?.replace(/\/$/, "");

function withApiKeyStatus(apiKey: ApiKeyResponse): ApiKey {
  return {
    ...apiKey,
    expired: Date.now() >= new Date(apiKey.expiresAt).getTime(),
  };
}

export function Dashboard() {
  const { getToken } = useAuth();
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveyRequired, setSurveyRequired] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAuthApi(path: string, init?: RequestInit) {
    if (!apiGatewayUrl) {
      throw new Error("NEXT_PUBLIC_API_GATEWAY_URL is required");
    }

    const token = await getToken();

    if (!token) {
      throw new Error("Clerk token is required");
    }

    return fetch(`${apiGatewayUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  }

  useEffect(() => {
    async function loadApiKey() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchAuthApi("/api/api-key");

        if (!response.ok) {
          setError("Could not load your API key.");
          return;
        }

        const data: { apiKey: ApiKeyResponse | null } = await response.json();
        setApiKey(data.apiKey ? withApiKeyStatus(data.apiKey) : null);
      } catch {
        setError("Could not load your API key.");
      } finally {
        setLoading(false);
      }
    }

    loadApiKey();
  }, [getToken]);

  useEffect(() => {
    async function loadSurveyResponse() {
      setSurveyLoading(true);

      try {
        const response = await fetch("/api/survey-response");

        if (!response.ok) {
          setSurveyRequired(true);
          return;
        }

        const data: { surveyResponse: unknown | null } = await response.json();
        setSurveyRequired(!data.surveyResponse);
      } catch {
        setSurveyRequired(true);
      } finally {
        setSurveyLoading(false);
      }
    }

    loadSurveyResponse();
  }, []);

  async function createApiKey() {
    setCreating(true);
    setError(null);

    try {
      const response = await fetchAuthApi("/api/api-key", { method: "POST" });

      if (!response.ok) {
        setError("Could not create your API key.");
        return;
      }

      const data: { apiKey: ApiKeyResponse } = await response.json();
      setApiKey(withApiKeyStatus(data.apiKey));
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
      const response = await fetchAuthApi("/api/api-key", { method: "DELETE" });

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

  async function renameApiKey(name: string) {
    setRenaming(true);
    setError(null);

    try {
      const response = await fetchAuthApi("/api/api-key", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        setError("Could not rename your API key.");
        return false;
      }

      const data: { apiKey: ApiKeyResponse } = await response.json();
      setApiKey(withApiKeyStatus(data.apiKey));
      return true;
    } catch {
      setError("Could not rename your API key.");
      return false;
    } finally {
      setRenaming(false);
    }
  }

  const actionDisabled =
    loading ||
    surveyLoading ||
    surveyRequired ||
    creating ||
    deleting ||
    (Boolean(apiKey) && !apiKey?.expired);
  const createButtonLabel = apiKey?.expired
    ? "Generate New Key"
    : "Create New Key";

  return (
    <Box
      component="main"
      sx={{ flex: 1, pb: { xs: 7, md: 12 }, pt: { xs: 5, md: 8 } }}
    >
      <OnboardingSurveyDialog
        open={surveyRequired}
        onComplete={() => setSurveyRequired(false)}
      />

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
              {creating ? "Creating..." : createButtonLabel}
            </Button>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Paper sx={{ border: "none", borderRadius: 1, overflow: "hidden" }}>
            <ApiKeysTable
              apiKey={apiKey}
              loading={loading}
              deleting={deleting}
              renaming={renaming}
              onDelete={deleteApiKey}
              onRename={renameApiKey}
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
