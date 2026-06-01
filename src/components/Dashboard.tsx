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
import { OnboardingSurveyDialog } from "@/components/OnboardingSurveyDialog";

type ApiKey = {
  id: string;
  clerkUserId: string;
  name?: string;
  keyValue: string;
  createdAt: string;
  expiresAt: string;
  expired: boolean;
};

type ApiKeyResponse = Omit<ApiKey, "expired">;

function withApiKeyStatus(apiKey: ApiKeyResponse): ApiKey {
  return {
    ...apiKey,
    expired: Date.now() >= new Date(apiKey.expiresAt).getTime(),
  };
}

async function fetchApiKeys() {
  const response = await fetch("/api/api-key");

  if (!response.ok) {
    throw new Error("Could not load API keys");
  }

  const data: { apiKeys: ApiKeyResponse[] } = await response.json();

  return data.apiKeys.map(withApiKeyStatus);
}

export function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveyRequired, setSurveyRequired] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadApiKeys() {
    setLoading(true);
    setError(null);

    try {
      setApiKeys(await fetchApiKeys());
    } catch {
      setError("Could not load your API keys.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialApiKeys() {
      try {
        const keys = await fetchApiKeys();

        if (!ignore) {
          setApiKeys(keys);
        }
      } catch {
        if (!ignore) {
          setError("Could not load your API keys.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialApiKeys();

    return () => {
      ignore = true;
    };
  }, []);

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
      const response = await fetch("/api/api-key", { method: "POST" });

      if (!response.ok) {
        if (response.status === 409) {
          setError("You can create up to 5 API keys.");
          return;
        }

        setError("Could not create your API key.");
        return;
      }

      await loadApiKeys();
    } catch {
      setError("Could not create your API key.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteApiKey(id: string) {
    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/api-key/${id}`, { method: "DELETE" });

      if (!response.ok) {
        setError("Could not delete your API key.");
        return;
      }

      setApiKeys((currentKeys) => currentKeys.filter((key) => key.id !== id));
    } catch {
      setError("Could not delete your API key.");
    } finally {
      setDeleting(false);
    }
  }

  async function renameApiKey(id: string, name: string) {
    setRenaming(true);
    setError(null);

    try {
      const response = await fetch(`/api/api-key/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        setError("Could not rename your API key.");
        return false;
      }

      const data: { apiKey: ApiKeyResponse } = await response.json();
      setApiKeys((currentKeys) =>
        currentKeys.map((key) =>
          key.id === data.apiKey.id ? withApiKeyStatus(data.apiKey) : key,
        ),
      );
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
    apiKeys.length >= 5;
  const createButtonLabel =
    apiKeys.length >= 5 ? "Key Limit Reached" : "Create New Key";

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
                Create and manage up to 5 keys used to access the API. Each key
                is active for 90 days only
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
              apiKeys={apiKeys}
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
