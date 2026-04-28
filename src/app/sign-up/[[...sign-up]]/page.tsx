import { SignUp } from '@clerk/nextjs';
import { Box } from '@mui/material';

export default function SignUpPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <SignUp fallbackRedirectUrl="/dashboard" signInUrl="/sign-in" />
    </Box>
  );
}
