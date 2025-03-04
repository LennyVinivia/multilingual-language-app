import SignupForm from "@/components/SignupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignupForm />;
}
