import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { SecretCell } from "@/components/SecretCell";
import { formatDate } from "@/lib/format";

const MAX_API_KEY_NAME_LENGTH = 120;

type ApiKeyRow = {
  name?: string;
  keyValue: string;
  createdAt: string;
  expiresAt: string;
  expired: boolean;
};

type ApiKeysTableProps = {
  apiKey: ApiKeyRow | null;
  loading?: boolean;
  deleting?: boolean;
  renaming?: boolean;
  onDelete?: () => void;
  onRename?: (name: string) => Promise<boolean>;
};

export function ApiKeysTable({
  apiKey,
  loading = false,
  deleting = false,
  renaming = false,
  onDelete,
  onRename,
}: ApiKeysTableProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [renameError, setRenameError] = useState<string | null>(null);

  const currentName = apiKey?.name ?? "Default";
  const trimmedName = draftName.trim();
  const nameTooLong = trimmedName.length > MAX_API_KEY_NAME_LENGTH;
  const canRename =
    Boolean(onRename) &&
    trimmedName.length > 0 &&
    !nameTooLong &&
    trimmedName !== currentName &&
    !renaming;

  function openRenameDialog() {
    setDraftName(currentName);
    setRenameError(null);
    setRenameDialogOpen(true);
  }

  function closeRenameDialog() {
    if (renaming) {
      return;
    }

    setRenameDialogOpen(false);
    setRenameError(null);
  }

  async function submitRename() {
    if (!onRename || !canRename) {
      return;
    }

    setRenameError(null);

    const renamed = await onRename(trimmedName);

    if (renamed) {
      setRenameDialogOpen(false);
      return;
    }

    setRenameError("Could not rename your API key. Please try again.");
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 760, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "13%" }}>Name</TableCell>
              <TableCell sx={{ width: 44 }} />
              <TableCell sx={{ width: "48%" }}>Key</TableCell>
              <TableCell sx={{ width: "13%" }}>Created</TableCell>
              <TableCell sx={{ width: "8%" }}>Status</TableCell>
              <TableCell align="right" sx={{ width: 88, whiteSpace: "nowrap" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton width={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width="80%" />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={32} sx={{ ml: "auto" }} />
                </TableCell>
              </TableRow>
            ) : apiKey ? (
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    {currentName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Rename API key"
                    disabled={!onRename || renaming}
                    onClick={openRenameDialog}
                    size="small"
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <SecretCell value={apiKey.keyValue} />
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary" variant="body2">
                    {formatDate(apiKey.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    sx={{
                      color: apiKey.expired ? "error.main" : "#27a768",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {apiKey.expired ? "Expired" : "Active"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="Delete API key"
                    color="error"
                    disabled={deleting}
                    onClick={onDelete}
                    size="small"
                  >
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ borderBottom: "none" }}>
                  <Box sx={{ py: 4.5, textAlign: "center" }}>
                    <Typography color="text.primary" variant="body2">
                      No API key yet - create one to get started
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={renameDialogOpen}
        onClose={closeRenameDialog}
      >
        <DialogTitle>Rename API key</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {renameError ? <Alert severity="error">{renameError}</Alert> : null}
            <TextField
              autoFocus
              disabled={renaming}
              error={nameTooLong}
              fullWidth
              helperText={
                nameTooLong
                  ? `Name must be ${MAX_API_KEY_NAME_LENGTH} characters or fewer.`
                  : "Choose a recognizable name for this API key."
              }
              label="API key name"
              onChange={(event) => setDraftName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitRename();
                }
              }}
              value={draftName}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={renaming} onClick={closeRenameDialog}>
            Cancel
          </Button>
          <Button
            disabled={!canRename}
            onClick={submitRename}
            variant="contained"
          >
            {renaming ? "Saving…" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
