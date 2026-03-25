import { NextResponse } from "next/server";
import { sanitizeContactPayload, validateEmail } from "@/utils/helpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = sanitizeContactPayload(body);

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!validateEmail(payload.email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Replace this console statement with an email service or database call later.
    console.log("New contact request:", payload);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for reaching out. I will get back to you soon."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending your message."
      },
      { status: 500 }
    );
  }
}
