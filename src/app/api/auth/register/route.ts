import { NextResponse } from "next/server";
import { createUserAccount } from "@/actions/register";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const result = await createUserAccount({ name, email, password });

  if (!result.ok) {
    const status = result.error.includes("already exists") ? 400 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true });
}
