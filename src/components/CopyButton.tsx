'use client';

import { useState } from 'react';
import { Button } from '@mui/material';

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button variant="outlined" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
