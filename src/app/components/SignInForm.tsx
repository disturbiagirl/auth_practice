"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter a password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome to your account");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border rounded-md shadow overflow-hidden"
    >
      <div className="p-2 text-center bg-gradient-to-b from-white to slate-200 dark:from-slate-700 dark:to-slate-900">
        Sign In Form
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Input
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Passoword"
          {...register("password")}
          type={visiblePass ? "text" : "password"}
          errorMessage={errors.password?.message}
          endContent={
            <button
              type="button"
              onClick={() => setVisiblePass((prev) => !prev)}
            >
              {visiblePass ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-center gap-2">
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
