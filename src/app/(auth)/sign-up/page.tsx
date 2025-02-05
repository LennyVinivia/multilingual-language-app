"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { signUp } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

const Page = () => {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // Fetch session state
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setSession(sessionData);
      if (sessionData) {
        redirect("/"); // Redirect if session exists
      }
    };

    fetchSession();
  }, []);

  // Validate form fields
  const validateForm = (formData: FormData) => {
    const newErrors: any = {};
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match.";
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Proceed with sign-up if validation passes
    const res = await signUp(formData);
    if (res.success) {
      redirect("/sign-in");
    } else {
      setErrors({ general: "An error occurred. Please try again." });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-5/6 m-auto">
      <h1 className="text-2xl font-bold">Enter your Data</h1>
      <span className="text-[#667085]">
        Complete this step to access platform
      </span>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <LabeledInput
          label="First Name"
          name="firstname"
          placeholder="Max"
          type="text"
          required
          autoComplete="given-name"
          error={errors.firstName}
        />
        <LabeledInput
          label="Last Name"
          name="lastname"
          placeholder="Mustermann"
          type="text"
          required
          autoComplete="family-name"
          error={errors.lastName}
        />
        <LabeledInput
          label="Email Address"
          name="email"
          placeholder="max.mustermann@gmail.com"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
        <LabeledInput
          label="Phone Number"
          name="phoneNumber"
          placeholder="0781428790"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phoneNumber}
        />
        <LabeledInput
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="new-password"
          error={errors.password}
        />
        <LabeledInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          required
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
        {errors.general && <p className="text-red-600">{errors.general}</p>}

        <Button
          className="w-full bg-[#475467]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link className="text-[#667085]" href="/sign-in">
            Already have an account?{" "}
            <span className="text-[#344054]">Sign in</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
