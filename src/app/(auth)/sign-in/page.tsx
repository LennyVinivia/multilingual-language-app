import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { executeAction } from "@/lib/executeAction";
import { auth, signIn } from "@/lib/auth";
//import { Checkbox } from "@/components/ui/checkbox";
import { redirect } from "next/navigation";
import Link from "next/link";
import OAuthButton from "@/components/ui/oAuthButton";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-5/6 m-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Welcome to Multilingual
      </h1>
      <OAuthButton className="my-6" provider="google" label="Google" />
      <OAuthButton className="my-6" provider="github" label="GitHub" />
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-[#6A6A6A]"></div>
        <span className="px-3 text-[#ACB1BC] text-sm">
          Or with email and password
        </span>
        <div className="flex-grow border-t border-[#6A6A6A]"></div>
      </div>
      <span className="text-[#ACB1BC]">
        Welcome back! Please enter your details
      </span>
      <form
        className="space-y-4 w-full mt-2"
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
        <Button
          className="w-full bg-[#475467] hover:bg-[#2a313c]"
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <div className="text-center">
        <Button variant="link">
          <Link className="text-[#ACB1BC]" href="/sign-up">
            <span>
              Dont have an account?
              <span className="text-[#344054]"> Sign up</span>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
