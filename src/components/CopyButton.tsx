'use client';

import { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';

type CopyButtonProps = {
  value: string;
  iconOnly?: boolean;
};

export function CopyButton({ value, iconOnly = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (iconOnly) {
    return (
      <Tooltip title={copied ? 'Copied' : 'Copy'}>
        <IconButton aria-label="Copy secret" size="small" onClick={copy}>
          {copied ? <CheckOutlined fontSize="small" /> : <ContentCopyOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button variant="outlined" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
