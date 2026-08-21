import {
  AtSign,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import ContactForm from "./contact-form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const contactInfo = [
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: "178/536 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  { icon: Phone, label: "โทรศัพท์", value: "02-123-4567" },
  { icon: Mail, label: "อีเมล", value: "contact@cosci.com" },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์ - ศุกร์ 09:00 - 18:00 น. เสาร์ 10:00 - 16:00 น.",
  },
];

const socialLinks = [
  { icon: Share2, label: "Facebook", href: "https://facebook.com/cosci" },
  { icon: AtSign, label: "Instagram", href: "https://instagram.com/cosci" },
  { icon: Globe, label: "Twitter", href: "https://twitter.com/cosci" },
  { icon: MessageCircle, label: "YouTube", href: "https://youtube.com/@cosci" },
];

const faqs = [
  {
    question: "ร้านเปิดทำการวันไหนบ้าง?",
    answer: "เปิดทุกวันจันทร์ถึงศุกร์ เวลา 09:00 - 18:00 น. และวันเสาร์ เวลา 10:00 - 16:00 น. หยุดทุกวันอาทิตย์",
  },
  {
    question: "สั่งซื้อสินค้าออนไลน์ได้หรือไม่?",
    answer: "ได้ โดยเพิ่มสินค้าลงตะกร้าแล้วทำรายการสั่งซื้อผ่านหน้าเว็บไซต์ได้เลย",
  },
  {
    question: "ค่าจัดส่งคิดอย่างไร?",
    answer: "จัดส่งฟรีสำหรับคำสั่งซื้อตั้งแต่ 500 บาทขึ้นไป ส่วนคำสั่งซื้อต่ำกว่านั้นคิดค่าจัดส่ง 50 บาท",
  },
  {
    question: "ติดต่อเรื่องการคืนสินค้าได้ที่ไหน?",
    answer: "สามารถส่งอีเมลมาที่ contact@cosci.com หรือส่งข้อความผ่านฟอร์มติดต่อนี้ได้ตลอดเวลา",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="flex min-h-screen px-6 py-20">
      <div className="mx-auto w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
        <h2 className="mx-auto max-w-(--breakpoint-md) text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          ติดต่อเรา
        </h2>
        <p className="mx-auto mt-3 max-w-(--breakpoint-md) text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
        </p>

        <div className="mt-18 grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <section aria-labelledby="contact-info-heading">
            <h3
              id="contact-info-heading"
              className="font-medium text-xl tracking-[-0.015em]"
            >
              ข้อมูลติดต่อ
            </h3>

            <ul className="mt-6 space-y-4">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 rounded-xl border p-5"
                >
                  <item.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm text-muted-foreground">
                      {item.label}
                    </h4>
                    <p className="mt-1">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-medium text-xl tracking-[-0.015em]">
              ติดตามเรา
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-medium text-xl tracking-[-0.015em]">
              คำถามที่พบบ่อย
            </h3>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {faq.question}
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Contact form */}
          <section
            aria-labelledby="contact-form-heading"
            className="rounded-xl border bg-card p-6 lg:p-8"
          >
            <h3
              id="contact-form-heading"
              className="font-medium text-xl tracking-[-0.015em]"
            >
              ส่งข้อความถึงเรา
            </h3>
            <p className="mt-2 text-muted-foreground">
              กรอกข้อมูลด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}