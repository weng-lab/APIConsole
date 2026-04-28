import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#111827",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "#ffffff",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: "none",
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "12px 16px",
          borderColor: theme.palette.divider,
        }),
        head: ({ theme }) => ({
          fontWeight: 600,
          color: theme.palette.text.secondary,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }),
      },
    },
  },
});
