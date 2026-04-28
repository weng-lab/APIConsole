'use client';

import { useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const DELETE_CONFIRMATION_TEXT = 'Delete account';

export function AccountMenu() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const email = user?.primaryEmailAddress?.emailAddress;
  const label = user?.firstName ?? email ?? 'Account';
  const canDeleteAccount = confirmationText === DELETE_CONFIRMATION_TEXT && !deletingAccount;

  function closeMenu() {
    setAnchorEl(null);
  }

  async function handleSignOut() {
    closeMenu();
    await signOut({ redirectUrl: '/' });
  }

  function openDeleteDialog() {
    closeMenu();
    setDeleteAccountError(null);
    setConfirmationText('');
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    if (deletingAccount) {
      return;
    }

    setDeleteDialogOpen(false);
    setDeleteAccountError(null);
    setConfirmationText('');
  }

  async function deleteAccount() {
    if (!canDeleteAccount) {
      return;
    }

    setDeletingAccount(true);
    setDeleteAccountError(null);

    try {
      const response = await fetch('/api/account', { method: 'DELETE' });

      if (!response.ok) {
        setDeleteAccountError('Could not delete your account. Please try again.');
        setDeletingAccount(false);
        return;
      }
    } catch {
      // Clerk can invalidate the session before the browser receives the response.
      // At this point the destructive request was sent, so leave the protected UI.
    }

    window.location.replace('/');
  }

  return (
    <>
      <Button color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)} variant="text">
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {email ? (
          <MenuItem disabled>
            <Typography variant="body2">{email}</Typography>
          </MenuItem>
        ) : null}
        {email ? <Divider /> : null}
        <MenuItem onClick={openDeleteDialog} sx={{ color: 'error.main' }}>
          Delete account
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>

      <Dialog fullWidth maxWidth="xs" open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography color="text.secondary">
              This permanently deletes your account and removes the API key associated with it. This action cannot be
              undone.
            </Typography>
            {deleteAccountError ? <Alert severity="error">{deleteAccountError}</Alert> : null}
            <TextField
              autoFocus
              disabled={deletingAccount}
              fullWidth
              label={`Type "${DELETE_CONFIRMATION_TEXT}" to confirm`}
              onChange={(event) => setConfirmationText(event.target.value)}
              value={confirmationText}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={deletingAccount} onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" disabled={!canDeleteAccount} onClick={deleteAccount} variant="contained">
            {deletingAccount ? 'Deleting...' : 'Delete account'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
