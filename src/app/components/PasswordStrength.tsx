// this component adds boxes under the password input that showcase with colour and amount of boxes how strong the password is

import { cn } from "clsx-tailwind-merge";

interface Props {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div
      // based on password strength there is a conditional formatting to the boxes placement
      className={cn(" col-span-2 flex gap-2", {
        "justify-around": passStrength === 3,
        "justify-start": passStrength < 3,
      })}
    >
      {Array.from({ length: passStrength }).map((i, index) => (
        <div
          key={index}
          // based on password strength there is a conditional formatting to the boxes colour
          className={cn("h-2 w-32 rounded-md", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
