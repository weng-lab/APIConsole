'use client';

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
} from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { SecretCell } from '@/components/SecretCell';
import { formatDate } from '@/lib/format';

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

// Note: rename (pencil) and rotate (refresh) controls and a "Last used" column
// are intentionally omitted — they would require backend support that doesn't
// exist yet.
export function ApiKeysTable({ apiKey, loading = false, deleting = false, onDelete }: ApiKeysTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '20%' }}>Name</TableCell>
            <TableCell>Secret</TableCell>
            <TableCell sx={{ width: '20%' }}>Created</TableCell>
            <TableCell align="right" sx={{ width: 72 }}>
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
                <Skeleton width="80%" />
              </TableCell>
              <TableCell>
                <Skeleton width={80} />
              </TableCell>
              <TableCell align="right">
                <Skeleton width={32} sx={{ ml: 'auto' }} />
              </TableCell>
            </TableRow>
          ) : apiKey ? (
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>{apiKey.name ?? 'Default'}</Typography>
              </TableCell>
              <TableCell>
                <SecretCell value={apiKey.keyValue} />
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {formatDate(apiKey.createdAt)}
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
              <TableCell colSpan={4} sx={{ borderBottom: 'none' }}>
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No API key yet — create one to get started.
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
