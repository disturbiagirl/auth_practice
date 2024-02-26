"use client";
import { Checkbox, Input, Button } from "@nextui-org/react";
import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import validator from "validator";
import errorMap from "zod/locales/en.js";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    // validator checks whether the input is phone number or not,
    password: z
      .string()
      .min(6, "Password must be at least 6 char.")
      .max(50, "password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 char.")
      .max(50, "password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["password", "confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const { register, handleSubmit, reset, control } = useForm<InputType>();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);
  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch"
    >
      <Input
        {...register("firstName")}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("lastName")}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("email")}
        className="col-span-2"
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        {...register("phone")}
        className="col-span-2"
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
      />
      <Input
        {...register("password")}
        className="col-span-2"
        label="Password"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          isVisiblePass ? (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePass}
            />
          ) : (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePass}
            />
          )
        }
      />
      <Input
        {...register("confirmPassword")}
        className="col-span-2"
        label="Confirm assword"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2"
          >
            I Accept The <Link href="/terms">Terms</Link>
          </Checkbox>
        )}
      />
      <div className="flex justify-center col-span-2">
        <Button className="w-48" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
