"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <form
        className="flex flex-col gap-2 p-2 border m-2 rounded-md shadow"
        onSubmit={handleSubmit(submitRequest)}
      >
        <div className="text-center p-2">Enter Your Email</div>
        <Input
          label="Email"
          {...register("email")}
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </form>
      <Image
        src={"/forgotPass.png"}
        width={500}
        height={500}
        className="col-span-2 place-self-center"
        alt="forgotPass"
      />
    </div>
  );
};

export default ForgotPassword;
