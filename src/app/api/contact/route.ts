import { NextRequest, NextResponse } from "next/server";
import {
  createContactMessage,
  validateContactMessage,
  type CreateContactMessageInput,
} from "@/services/contactService";

export async function POST(request: NextRequest) {
  let body: Partial<CreateContactMessageInput>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", message: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  const errors = validateContactMessage(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed", message: errors[0].message, errors },
      { status: 400 }
    );
  }

  try {
    const created = await createContactMessage(body as CreateContactMessageInput);
    return NextResponse.json(
      { data: { id: created.id }, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/contact] Failed to create contact message:", err);
    return NextResponse.json(
      { error: "Internal error", message: "Failed to send message" },
      { status: 500 }
    );
  }
}
