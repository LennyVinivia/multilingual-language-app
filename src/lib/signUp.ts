import db from "./db";
import { executeAction } from "./executeAction";
import { userSignupSchema } from "./schema";
import bcrypt from "bcrypt";

export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const firstname = formData.get("firstname")?.toString() ?? "";
      const lastname = formData.get("lastname")?.toString() ?? "";
      const username = formData.get("username")?.toString() ?? "";
      const email = formData.get("email")?.toString() ?? "";
      const password = formData.get("password")?.toString() ?? "";

      const validatedData = userSignupSchema.parse({
        firstname,
        lastname,
        username,
        email,
        password,
      });

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      await db.user.create({
        data: {
          firstname: validatedData.firstname,
          lastname: validatedData.lastname,
          username: validatedData.username,
          email: validatedData.email.toLowerCase(),
          password: hashedPassword,
        },
      });
    },
  });
};
