import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

const userSignupSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    /*const formData = await request.formData();
    const firstname = formData.get("firstname")?.toString() ?? "";
    const lastname = formData.get("lastname")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";*/

    const { firstname, lastname, username, email, password } =
      await request.json();

    const parsed = userSignupSchema.parse({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    await db.user.create({
      data: {
        firstname: parsed.firstname,
        lastname: parsed.lastname,
        username: parsed.username,
        email: parsed.email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
