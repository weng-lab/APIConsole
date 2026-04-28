'use client';

import { useState } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { CopyButton } from '@/components/CopyButton';
import { maskSecret } from '@/lib/format';

export function SecretCell({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          letterSpacing: '0.02em',
          overflowWrap: 'anywhere',
          flex: 1,
          minWidth: 0,
        }}
      >
        {revealed ? value : maskSecret(value)}
      </Box>
      <Tooltip title={revealed ? 'Hide' : 'Reveal'}>
        <IconButton
          aria-label={revealed ? 'Hide secret' : 'Reveal secret'}
          size="small"
          onClick={() => setRevealed((prev) => !prev)}
        >
          {revealed ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>
      <CopyButton value={value} iconOnly />
    </Stack>
  );
}
