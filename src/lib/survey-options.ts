export const HEARD_ABOUT_OPTIONS = [
  { value: "google", label: "Google / search engine" },
  {
    value: "word_of_mouth",
    label: "Word of mouth / colleague / industry contact",
  },
  { value: "paper", label: "Research paper" },
  { value: "social_media", label: "Social media" },
  { value: "conference", label: "Conference / workshop / seminar" },
  { value: "weng_lab_site", label: "Weng Lab / UMass Chan website" },
  { value: "other", label: "Other" },
] as const;

export const USE_CASE_OPTIONS = [
  { value: "hobby_research", label: "Hobby / independent research" },
  { value: "funded_academic_research", label: "Funded academic research" },
  { value: "industry_research", label: "Industry / commercial research" },
  { value: "school_project", label: "School project / coursework" },
  { value: "method_development", label: "Method / tool development" },
  { value: "data_exploration", label: "Data exploration / evaluation" },
  { value: "other", label: "Other" },
] as const;

export type HeardAboutValue = (typeof HEARD_ABOUT_OPTIONS)[number]["value"];
export type UseCaseValue = (typeof USE_CASE_OPTIONS)[number]["value"];

const heardAboutValues = new Set<string>(
  HEARD_ABOUT_OPTIONS.map((option) => option.value),
);
const useCaseValues = new Set<string>(
  USE_CASE_OPTIONS.map((option) => option.value),
);

export function isHeardAboutValue(value: string): value is HeardAboutValue {
  return heardAboutValues.has(value);
}

export function isUseCaseValue(value: string): value is UseCaseValue {
  return useCaseValues.has(value);
}
