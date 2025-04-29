"use server";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateInvoices = FormSchema.omit({ id: true, date: true });

export async function createInvoices(formData: FormData) {
  const { amount, customerId, status } = CreateInvoices.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountOfCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountOfCents}, ${status}, ${date})
  `;
  } catch (e) {}
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoices(id: string, formData: FormData) {
  const { status, customerId, amount } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountOfCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountOfCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (e) {}
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoices(id: string) {
  throw new Error("Test error");
  await sql`DELETE FROM invoices WHERE id= ${id}`;
  revalidatePath("/dashboard/invoices");
}
