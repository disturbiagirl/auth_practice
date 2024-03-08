"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(52, "Password must be at most 52 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  return (
    <form className="flex flex-col gap-2 m-2 p-2 border rounded-md shadow text-center">
      <p>Reset Your Password</p>
      <Input
        label="Password"
        {...register("password")}
        type={visiblePass ? "text" : "password"}
        errorMessage={errors.password?.message}
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        label="Confirm Password"
        {...register("confirmPassword")}
        type={visiblePass ? "text" : "password"}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
