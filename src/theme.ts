import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f1f1f",
    },
    background: {
      default: "#eeeeee",
      paper: "#ffffff",
    },
    text: {
      primary: "#222222",
      secondary: "#6d6d6d",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    body2: {
      fontSize: "0.8125rem",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "primary",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#1f1f1f",
          color: "#ffffff",
          borderBottom: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "56px",
          "@media (min-width: 600px)": {
            minHeight: "56px",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: "0.8125rem",
          fontWeight: 500,
          textTransform: "none",
          "&.MuiButton-containedPrimary": {
            backgroundColor: "#1f1f1f",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.28)",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#111111",
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.32)",
            },
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "13px 16px",
          borderColor: "#dfdfdf",
          color: theme.palette.text.primary,
          fontSize: "0.8125rem",
        }),
        head: {
          fontWeight: 600,
          color: "#222222",
          fontSize: "0.75rem",
          letterSpacing: 0,
        },
      },
    },
  },
});
