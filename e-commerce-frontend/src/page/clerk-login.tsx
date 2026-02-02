import { SignIn } from "@clerk/clerk-react";

export default function ClerkLogin() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <SignIn
          routing="path"
          path="/clerk-login"
          signUpUrl="/clerk-signup"
          afterSignInUrl="/dashboard"
        />
      </div>
    </main>
  );
}
