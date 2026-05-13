import { auth } from "@clerk/nextjs/server";
import {
  createSurveyResponseForUser,
  getSurveyResponseForUser,
  parseSurveyPayload,
  serializeSurveyResponse,
} from "@/lib/survey-responses";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const surveyResponse = await getSurveyResponseForUser(userId);

  return Response.json({
    surveyResponse: surveyResponse
      ? serializeSurveyResponse(surveyResponse)
      : null,
  });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid survey response" }, { status: 400 });
  }

  const payload = parseSurveyPayload(body);

  if (!payload) {
    return Response.json({ error: "Invalid survey response" }, { status: 400 });
  }

  try {
    const { response, created } = await createSurveyResponseForUser(
      userId,
      payload,
    );

    return Response.json(
      { surveyResponse: serializeSurveyResponse(response) },
      { status: created ? 201 : 200 },
    );
  } catch {
    return Response.json(
      { error: "Could not save survey response" },
      { status: 500 },
    );
  }
}
