export const initialContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeContactPayload(payload = {}) {
  // Trimming input in one place keeps the API handler focused on validation and response flow.
  return {
    name: payload.name?.trim() || "",
    email: payload.email?.trim() || "",
    subject: payload.subject?.trim() || "",
    message: payload.message?.trim() || ""
  };
}
