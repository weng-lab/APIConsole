import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userSurveyResponses } from "@/db/schema";
import {
  type HeardAboutValue,
  type UseCaseValue,
  isHeardAboutValue,
  isUseCaseValue,
} from "@/lib/survey-options";

const MAX_FREE_TEXT_LENGTH = 500;

export type SurveyResponse = {
  heardAbout: HeardAboutValue[];
  heardAboutPaper: string | null;
  heardAboutOther: string | null;
  useCases: UseCaseValue[];
  useCaseOther: string | null;
  createdAt: Date;
};

export type SurveyResponseJson = Omit<SurveyResponse, "createdAt"> & {
  createdAt: string;
};

type SurveyPayload = {
  heardAbout: HeardAboutValue[];
  heardAboutPaper: string | null;
  heardAboutOther: string | null;
  useCases: UseCaseValue[];
  useCaseOther: string | null;
};

function cleanOptionalText(value: unknown) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isValidFreeText(value: string | null) {
  return !value || value.length <= MAX_FREE_TEXT_LENGTH;
}

export function serializeSurveyResponse(
  response: SurveyResponse,
): SurveyResponseJson {
  return {
    ...response,
    createdAt: response.createdAt.toISOString(),
  };
}

function toSurveyResponse(
  response: typeof userSurveyResponses.$inferSelect,
): SurveyResponse {
  return {
    heardAbout: response.heardAbout as HeardAboutValue[],
    heardAboutPaper: response.heardAboutPaper,
    heardAboutOther: response.heardAboutOther,
    useCases: response.useCases as UseCaseValue[],
    useCaseOther: response.useCaseOther,
    createdAt: response.createdAt,
  };
}

export function parseSurveyPayload(body: unknown): SurveyPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const {
    heardAbout,
    heardAboutPaper,
    heardAboutOther,
    useCases,
    useCaseOther,
  } = body as Record<string, unknown>;

  if (!Array.isArray(heardAbout) || heardAbout.length === 0) {
    return null;
  }

  const normalizedHeardAbout = Array.from(new Set(heardAbout));

  if (
    !normalizedHeardAbout.every(
      (heardAboutOption): heardAboutOption is HeardAboutValue =>
        typeof heardAboutOption === "string" &&
        isHeardAboutValue(heardAboutOption),
    )
  ) {
    return null;
  }

  if (!Array.isArray(useCases) || useCases.length === 0) {
    return null;
  }

  const normalizedUseCases = Array.from(new Set(useCases));

  if (
    !normalizedUseCases.every(
      (useCase): useCase is UseCaseValue =>
        typeof useCase === "string" && isUseCaseValue(useCase),
    )
  ) {
    return null;
  }

  const validHeardAbout = normalizedHeardAbout as HeardAboutValue[];
  const validUseCases = normalizedUseCases as UseCaseValue[];

  const paperText = validHeardAbout.includes("paper")
    ? cleanOptionalText(heardAboutPaper)
    : null;
  const heardOtherText = validHeardAbout.includes("other")
    ? cleanOptionalText(heardAboutOther)
    : null;
  const useCaseOtherText = validUseCases.includes("other")
    ? cleanOptionalText(useCaseOther)
    : null;

  if (validHeardAbout.includes("other") && !heardOtherText) {
    return null;
  }

  if (validUseCases.includes("other") && !useCaseOtherText) {
    return null;
  }

  if (
    !isValidFreeText(paperText) ||
    !isValidFreeText(heardOtherText) ||
    !isValidFreeText(useCaseOtherText)
  ) {
    return null;
  }

  return {
    heardAbout: validHeardAbout,
    heardAboutPaper: paperText,
    heardAboutOther: heardOtherText,
    useCases: validUseCases,
    useCaseOther: useCaseOtherText,
  };
}

export async function getSurveyResponseForUser(clerkUserId: string) {
  const [response] = await db
    .select()
    .from(userSurveyResponses)
    .where(eq(userSurveyResponses.clerkUserId, clerkUserId))
    .limit(1);

  return response ? toSurveyResponse(response) : null;
}

export async function createSurveyResponseForUser(
  clerkUserId: string,
  payload: SurveyPayload,
) {
  const [response] = await db
    .insert(userSurveyResponses)
    .values({
      clerkUserId,
      heardAbout: payload.heardAbout,
      heardAboutPaper: payload.heardAboutPaper,
      heardAboutOther: payload.heardAboutOther,
      useCases: payload.useCases,
      useCaseOther: payload.useCaseOther,
    })
    .onConflictDoNothing({
      target: userSurveyResponses.clerkUserId,
    })
    .returning();

  if (response) {
    return { response: toSurveyResponse(response), created: true };
  }

  const existingResponse = await getSurveyResponseForUser(clerkUserId);

  if (!existingResponse) {
    throw new Error("Could not create survey response");
  }

  return { response: existingResponse, created: false };
}
