import {
  Box,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { SecretCell } from "@/components/SecretCell";
import { formatDate } from "@/lib/format";

type ApiKeyRow = {
  name?: string;
  keyValue: string;
  createdAt: string;
};

type ApiKeysTableProps = {
  apiKey: ApiKeyRow | null;
  loading?: boolean;
  deleting?: boolean;
  onDelete?: () => void;
};

export function ApiKeysTable({
  apiKey,
  loading = false,
  deleting = false,
  onDelete,
}: ApiKeysTableProps) {
  return (
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
                  {apiKey.name ?? "Default"}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton aria-label="Rename API key" disabled size="small">
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
                  sx={{ color: "#27a768", fontSize: "0.8125rem" }}
                >
                  Active
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
  );
}
