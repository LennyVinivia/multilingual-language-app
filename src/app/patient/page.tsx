import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PatientDetail from "@/components/PatientDetail";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  return <PatientDetail />;
};

export default Page;
