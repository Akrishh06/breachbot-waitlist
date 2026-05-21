import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userTypes = new Set([
  "Solo founder",
  "Company lead",
  "Student",
  "Developer",
  "Designer",
  "Security team",
  "Other",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const email =
    isRecord(payload) && typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";
  const website =
    isRecord(payload) && typeof payload.website === "string"
      ? payload.website.trim()
      : "";
  const userType =
    isRecord(payload) && typeof payload.userType === "string"
      ? payload.userType.trim()
      : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!userTypes.has(userType)) {
    return NextResponse.json(
      { error: "Choose the option that best describes you." },
      { status: 400 },
    );
  }

  const dataDir = path.join(process.cwd(), "data");
  const waitlistFile = path.join(dataDir, "waitlist.jsonl");
  const record = {
    email,
    userType,
    createdAt: new Date().toISOString(),
    source: "waitlist",
  };

  await mkdir(dataDir, { recursive: true });
  await appendFile(waitlistFile, `${JSON.stringify(record)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
