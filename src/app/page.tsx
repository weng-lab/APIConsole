import Link from 'next/link';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack spacing={1}>
              <Typography component="h1" variant="h3" sx={{ fontWeight: 700 }}>
                API Console
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Create and manage your API key.
              </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', sm: 'auto' } }}>
              <Link href="/dashboard">
                <Button variant="contained" size="large">
                  Open dashboard
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button fullWidth variant="outlined" size="large">
                  Sign in
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
