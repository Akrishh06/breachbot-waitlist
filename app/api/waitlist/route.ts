import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
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

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Waitlist storage is not configured." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    user_type: userType,
    source: "waitlist",
  });

  if (error) {
    console.error("Supabase waitlist insert failed:", error);
    return NextResponse.json(
      { error: "Could not join the waitlist. Try again soon." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
