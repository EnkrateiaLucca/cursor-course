import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <SignUp />
    </div>
  );
}
