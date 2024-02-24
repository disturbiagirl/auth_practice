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

const SignupForm = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);
  return (
    <form className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        className="col-span-2"
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        className="col-span-2"
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
      />
      <Input
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
        className="col-span-2"
        label="Confirm assword"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <Checkbox className="col-span-2">
        I accept the <Link href="/terms">terms</Link>
      </Checkbox>
      <div className="flex justify-center col-span-2">
        <Button className="w-48" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
