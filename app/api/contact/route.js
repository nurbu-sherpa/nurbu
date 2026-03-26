import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sanitizeContactPayload, validateEmail } from "@/utils/helpers";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
}

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

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured yet. Add Gmail environment variables first."
        },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: payload.email,
      subject: payload.subject || `New portfolio message from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.subject ? `Subject: ${payload.subject}` : null,
        "",
        "Message:",
        payload.message
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;margin:0 auto;">
          <h2 style="margin-bottom:16px;">New portfolio contact message</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          ${payload.subject ? `<p><strong>Subject:</strong> ${payload.subject}</p>` : ""}
          <div style="margin-top:20px;padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;white-space:pre-wrap;">
            ${payload.message}
          </div>
        </div>
      `
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for reaching out. Your message has been sent successfully."
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
