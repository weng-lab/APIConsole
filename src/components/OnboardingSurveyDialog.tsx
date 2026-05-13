"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  HEARD_ABOUT_OPTIONS,
  USE_CASE_OPTIONS,
  type HeardAboutValue,
  type UseCaseValue,
} from "@/lib/survey-options";

type OnboardingSurveyDialogProps = {
  open: boolean;
  onComplete: () => void;
};

export function OnboardingSurveyDialog({
  open,
  onComplete,
}: OnboardingSurveyDialogProps) {
  const [heardAbout, setHeardAbout] = useState<HeardAboutValue[]>([]);
  const [heardAboutPaper, setHeardAboutPaper] = useState("");
  const [heardAboutOther, setHeardAboutOther] = useState("");
  const [useCases, setUseCases] = useState<UseCaseValue[]>([]);
  const [useCaseOther, setUseCaseOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heardOtherRequired = heardAbout.includes("other");
  const useCaseOtherRequired = useCases.includes("other");
  const canSubmit =
    heardAbout.length > 0 &&
    useCases.length > 0 &&
    (!heardOtherRequired || Boolean(heardAboutOther.trim())) &&
    (!useCaseOtherRequired || Boolean(useCaseOther.trim())) &&
    !submitting;
  const completionHint = !heardAbout.length
    ? "Select at least one discovery source."
    : !useCases.length
      ? "Select at least one use case."
      : heardOtherRequired && !heardAboutOther.trim()
        ? "Add a short note for how you heard about us."
        : useCaseOtherRequired && !useCaseOther.trim()
          ? "Add a short note for your other use case."
          : null;

  function toggleHeardAbout(value: HeardAboutValue) {
    setHeardAbout((currentHeardAbout) =>
      currentHeardAbout.includes(value)
        ? currentHeardAbout.filter(
            (heardAboutOption) => heardAboutOption !== value,
          )
        : [...currentHeardAbout, value],
    );
  }

  function toggleUseCase(value: UseCaseValue) {
    setUseCases((currentUseCases) =>
      currentUseCases.includes(value)
        ? currentUseCases.filter((useCase) => useCase !== value)
        : [...currentUseCases, value],
    );
  }

  async function submitSurvey() {
    setSubmitAttempted(true);

    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/survey-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heardAbout,
          heardAboutPaper,
          heardAboutOther,
          useCases,
          useCaseOther,
        }),
      });

      if (!response.ok) {
        setError(
          "Could not save your response. Please check the form and try again.",
        );
        return;
      }

      await response.json();

      onComplete();
    } catch {
      setError("Could not save your response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      aria-labelledby="onboarding-survey-title"
      fullWidth
      maxWidth="md"
      open={open}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogTitle id="onboarding-survey-title" sx={{ px: 3, pb: 1.5, pt: 3 }}>
        Help us improve SCREEN access
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 2.5, pt: 0 }}>
        <Stack spacing={2.25}>
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.5 }}
            variant="body2"
          >
            Two quick questions help the Weng Lab understand how researchers use
            the API. Select all that apply.
          </Typography>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <FormControl required>
            <FormLabel
              sx={{ color: "text.primary", fontWeight: 700, mb: 0.75 }}
            >
              How did you hear about us?
            </FormLabel>
            <FormGroup
              sx={{
                display: "grid",
                columnGap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              {HEARD_ABOUT_OPTIONS.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={heardAbout.includes(option.value)}
                      onChange={() => toggleHeardAbout(option.value)}
                      size="small"
                    />
                  }
                  key={option.value}
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>

          {heardAbout.includes("paper") ? (
            <TextField
              fullWidth
              label="Which paper? If you remember"
              onChange={(event) => setHeardAboutPaper(event.target.value)}
              size="small"
              value={heardAboutPaper}
            />
          ) : null}

          {heardAbout.includes("other") ? (
            <TextField
              fullWidth
              label="Please tell us how you heard about us"
              onChange={(event) => setHeardAboutOther(event.target.value)}
              required
              size="small"
              value={heardAboutOther}
            />
          ) : null}

          <FormControl required>
            <FormLabel
              sx={{ color: "text.primary", fontWeight: 700, mb: 0.75 }}
            >
              What are you using it for?
            </FormLabel>
            <FormGroup
              sx={{
                display: "grid",
                columnGap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              {USE_CASE_OPTIONS.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useCases.includes(option.value)}
                      onChange={() => toggleUseCase(option.value)}
                      size="small"
                    />
                  }
                  key={option.value}
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>

          {useCases.includes("other") ? (
            <TextField
              fullWidth
              label="Please describe your use case"
              onChange={(event) => setUseCaseOther(event.target.value)}
              required
              size="small"
              value={useCaseOther}
            />
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          bgcolor: "#ffffff",
          borderTop: "1px solid #e6e6e6",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        {submitAttempted && completionHint ? (
          <Typography color="text.secondary" variant="caption">
            {completionHint}
          </Typography>
        ) : (
          <Box />
        )}
        <Button
          disabled={submitting}
          onClick={submitSurvey}
          startIcon={submitting ? <CircularProgress size={16} /> : null}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" }, minWidth: 172 }}
          variant="contained"
        >
          {submitting ? "Saving..." : "Create API key"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
