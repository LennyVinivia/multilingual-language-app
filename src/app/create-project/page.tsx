import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateProjectPage from "@/components/create-project/CreateProjectPage";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  return <CreateProjectPage />;
};

export default Page;
