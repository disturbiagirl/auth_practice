import { Image, Link } from "@nextui-org/react";
import SignupForm from "@/app/components/SignUpForm";

const SignupPage = () => {
  return (
    <div className="grid items-center place-items-center grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center justify-center md:col-span-2">
        <p className="p-2 text-center">Already Signed up?</p>
        <Link href="/auth/signin">Sign In</Link>
      </div>
      <SignupForm />
      <Image src="/login.png" alt="Login" width={500} height={500} />
    </div>
  );
};

export default SignupPage;
