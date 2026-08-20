"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact"

type FormStatus = "idle" | "pending" | "success" | "error"

type ContactResponse = {
  success: boolean
  message?: string
  errors?: Record<string, string[] | undefined>
}

const FIELD_NAMES = ["name", "email", "subject", "message"] as const

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setStatus("pending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = (await response.json()) as ContactResponse

      if (result.success) {
        form.reset()
        setStatus("success")
        return
      }

      if (result.errors) {
        for (const fieldName of FIELD_NAMES) {
          const messages = result.errors[fieldName]
          if (messages?.length) {
            form.setError(fieldName, {
              type: "server",
              message: messages[0],
            })
          }
        }
      }

      setErrorMessage(
        result.message ?? "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง"
      )
      setStatus("error")
    } catch {
      setErrorMessage("ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง")
      setStatus("error")
    }
  }

  const isPending = status === "pending"

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-name">ชื่อ</FieldLabel>
              <Input
                {...field}
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="ชื่อของคุณ"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-email">อีเมล</FieldLabel>
              <Input
                {...field}
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-subject">หัวข้อ</FieldLabel>
              <Input
                {...field}
                id="contact-subject"
                type="text"
                placeholder="เรื่องที่ต้องการติดต่อ"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">ข้อความ</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                rows={5}
                placeholder="รายละเอียดข้อความของคุณ"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">กรุณาอย่ากรอกช่องนี้</label>
          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            )}
          />
        </div>
      </FieldGroup>

      <div aria-live="polite" className="mt-6">
        {status === "success" && (
          <p
            role="status"
            className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground"
          >
            ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="mt-6 w-full">
        {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  )
}