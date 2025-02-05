import db from "./db";
import { executeAction } from "./executeAction";
import { schema } from "./schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      await db.user.create({
        data: {
          lastname: formData.get("lastname"),
          firstname: formData.get("firstname"),
          phoneNumber: formData.get("phoneNumber"),
          email: validatedData.email.toLowerCase(),
          password: validatedData.password,
        },
      });
    },
  });
};

export { signUp };
