import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { executeAction } from "@/lib/executeAction";
import { auth, signIn } from "@/lib/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-5/6 m-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to AdiMed</h1>
      <span className="text-[#667085]">
        Welcome back! Please enter your details
      </span>

      <form
        className="space-y-4 w-full"
        action={async (formData: FormData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        }}
      >
        <LabeledInput
          label="Email"
          name="email"
          placeholder="max.muster@gmail.com"
          type="email"
          required
          autoComplete="email"
        />
        <LabeledInput
          label="Password"
          name="password"
          placeholder="password"
          type="password"
          required
          autoComplete="current-password"
        />
        <div className="flex justify-between items-center">
          <Checkbox />
          <div>
            <span className="text-[#667085] hover:text-black cursor-pointer">
              Forgot password
            </span>
          </div>
        </div>

        <Button className="w-full bg-[#475467]" type="submit">
          Sign In
        </Button>
      </form>

      {/*<div className="text-center">
        <Button asChild variant="link">
          <Link className="text-[#667085]" href="/sign-up">
            Don&apos;t have an account?{" "}
            <span className="text-[#344054]">Sign up</span>
          </Link>
        </Button>
      </div>*/}
    </div>
  );
};

export default Page;
