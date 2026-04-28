'use client';

import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Alert, Box, Button, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
import { CopyButton } from '@/components/CopyButton';

type ApiKey = {
  keyValue: string;
  createdAt: string;
};

export function Dashboard() {
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApiKey() {
      const response = await fetch('/api/api-key');

      if (!response.ok) {
        setError('Could not load your API key.');
        setLoading(false);
        return;
      }

      const data: { apiKey: ApiKey | null } = await response.json();
      setApiKey(data.apiKey);
      setLoading(false);
    }

    loadApiKey();
  }, []);

  async function createApiKey() {
    setCreating(true);
    setError(null);

    const response = await fetch('/api/api-key', { method: 'POST' });

    if (!response.ok) {
      setError('Could not create your API key.');
      setCreating(false);
      return;
    }

    const data: { apiKey: ApiKey } = await response.json();
    setApiKey(data.apiKey);
    setCreating(false);
  }

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 3, sm: 6 } }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack spacing={2} sx={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              API Console
            </Typography>
            <UserButton />
          </Stack>

          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 2.5, sm: 4 } }}>
            <Stack spacing={3}>
              <Stack spacing={0.75}>
                <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
                  Your API key
                </Typography>
                <Typography color="text.secondary">Use this key for requests to your API.</Typography>
              </Stack>

              {error ? <Alert severity="error">{error}</Alert> : null}

              {loading ? (
                <CircularProgress size={24} />
              ) : apiKey ? (
                <Stack spacing={2}>
                  <Box
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      fontFamily: 'monospace',
                      overflowWrap: 'anywhere',
                      p: 2,
                    }}
                  >
                    {apiKey.keyValue}
                  </Box>
                  <Stack
                    spacing={2}
                    sx={{
                      alignItems: { xs: 'stretch', sm: 'center' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      Created {new Date(apiKey.createdAt).toLocaleDateString()}
                    </Typography>
                    <CopyButton value={apiKey.keyValue} />
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <Alert severity="info" sx={{ width: '100%' }}>
                    No API key yet.
                  </Alert>
                  <Button type="button" variant="contained" size="large" onClick={createApiKey} disabled={creating}>
                    {creating ? 'Creating...' : 'Create API key'}
                  </Button>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
