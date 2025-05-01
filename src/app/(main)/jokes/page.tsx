import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserProfile } from "@/lib/user";
import { redirect } from "next/navigation";
import JokesContent from "@/components/JokesContent";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  const user = await getUserProfile(session.user?.id || "");

  if (!user) {
    return notFound();
  }

  return <JokesContent />;
}
