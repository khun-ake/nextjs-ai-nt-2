import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string
  );
}

function buildEmailBody(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const text = [
    `ชื่อ: ${values.name}`,
    `อีเมล: ${values.email}`,
    `หัวข้อ: ${values.subject}`,
    "",
    "ข้อความ:",
    values.message,
  ].join("\n");

  const html = `
    <h2>ติดต่อจากหน้าเว็บ</h2>
    <p><strong>ชื่อ:</strong> ${escapeHtml(values.name)}</p>
    <p><strong>อีเมล:</strong> ${escapeHtml(values.email)}</p>
    <p><strong>หัวข้อ:</strong> ${escapeHtml(values.subject)}</p>
    <p><strong>ข้อความ:</strong></p>
    <p>${escapeHtml(values.message).replace(/\n/g, "<br/>")}</p>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "ข้อมูลที่ส่งมาไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  const website = (payload as Record<string, unknown>)?.website;
  if (website && String(website).trim() !== "") {
    return Response.json({ success: true });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return Response.json(
      {
        success: false,
        message: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = result.data;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail || !process.env.RESEND_API_KEY) {
    console.error(
      "Contact form: missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL"
    );
    return Response.json(
      {
        success: false,
        message: "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `[ติดต่อ] ${subject}`,
    ...buildEmailBody({ name, email, subject, message }),
  });

  if (error) {
    console.error("Contact form: failed to send email", error);
    return Response.json(
      {
        success: false,
        message: "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
      },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}