import GermanPageContent from "@/components/GermanPageContent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  return <GermanPageContent />;
};

export default Page;
