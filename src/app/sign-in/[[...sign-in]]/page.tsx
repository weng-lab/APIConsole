import { SignIn } from '@clerk/nextjs';
import { Box } from '@mui/material';

export default function SignInPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <SignIn fallbackRedirectUrl="/dashboard" signUpUrl="/sign-up" />
    </Box>
  );
}
