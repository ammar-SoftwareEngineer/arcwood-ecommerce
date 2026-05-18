import { NextResponse } from "next/server";
import { forgetPasswordAction } from "@/actions/forgetPassword";

export async function POST(req: Request) {
  try {
    const { email, locale = "en" } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await forgetPasswordAction(email, locale);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("forget-password API:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
