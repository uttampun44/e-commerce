import { SignUp } from "@clerk/clerk-react";

export default function ClerkSignUp() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <SignUp
          routing="path"
          path="/clerk-signup"
          signInUrl="/clerk-login"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </main>
  );
}
