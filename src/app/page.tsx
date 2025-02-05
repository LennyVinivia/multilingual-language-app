import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectsPageContent from "@/components/ProjectsPage";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  return <ProjectsPageContent />;
};

export default Page;
