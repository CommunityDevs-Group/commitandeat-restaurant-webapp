import { prisma } from "@/lib/prisma";

export interface CreateContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationError {
  field: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactMessage(
  input: Partial<CreateContactMessageInput>
): ContactValidationError[] {
  const errors: ContactValidationError[] = [];

  if (!input.name || input.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!input.email || input.email.trim().length === 0) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!EMAIL_REGEX.test(input.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  if (!input.subject || input.subject.trim().length === 0) {
    errors.push({ field: "subject", message: "Subject is required" });
  }

  if (!input.message || input.message.trim().length === 0) {
    errors.push({ field: "message", message: "Message is required" });
  }

  return errors;
}

export async function createContactMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      subject: input.subject.trim(),
      message: input.message.trim(),
    },
    select: { id: true },
  });
}
