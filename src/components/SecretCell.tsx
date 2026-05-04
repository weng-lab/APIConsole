"use client";

import { useState } from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import { CopyButton } from "@/components/CopyButton";
import { maskSecret } from "@/lib/format";

export function SecretCell({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", minWidth: 0, width: "100%" }}
    >
      <Box
        component="span"
        sx={{
          bgcolor: "#f6f6f6",
          border: "1px solid #e2e2e2",
          borderRadius: 1,
          display: "block",
          flex: "0 1 auto",
          fontFamily: "monospace",
          fontSize: "0.875rem",
          letterSpacing: "0.02em",
          maxWidth: "100%",
          minWidth: 0,
          px: 1,
          py: 0.5,
          width: "fit-content",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {revealed ? value : maskSecret(value)}
      </Box>
      <Tooltip title={revealed ? "Hide" : "Reveal"}>
        <IconButton
          aria-label={revealed ? "Hide secret" : "Reveal secret"}
          size="small"
          onClick={() => setRevealed((prev) => !prev)}
        >
          {revealed ? (
            <VisibilityOffOutlined fontSize="small" />
          ) : (
            <VisibilityOutlined fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <CopyButton value={value} iconOnly />
    </Stack>
  );
}
