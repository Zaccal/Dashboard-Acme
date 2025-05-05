"use server";

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer",
  }),
  amount: z.coerce
    .number()
    .gte(1, { message: "Please enter an amount greater then $0" }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please enter an invoice status",
  }),
  date: z.string(),
});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
const CreateInvoices = FormSchema.omit({ id: true, date: true });

export async function createInvoices(prevState: State, formData: FormData) {
  const validationFields = CreateInvoices.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: "Missing Fields. Fields to Create Invoice",
    };
  }

  const { amount, customerId, status } = validationFields.data;

  const amountOfCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountOfCents}, ${status}, ${date})
  `;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "unkown";
    return {
      message: `Database Error: Failed to Create Invoice (${errorMessage})`,
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoices(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validationFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: "Missing Fields. Fields to Create Invoice",
    };
  }

  const { amount, customerId, status } = validationFields.data;

  const amountOfCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountOfCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "unkown";
    return {
      message: `Database Error: Failed to Update Invoice (${errorMessage})`,
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoices(id: string) {
  await sql`DELETE FROM invoices WHERE id= ${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      typeof error.type === "string" &&
      error instanceof AuthError
    ) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}
