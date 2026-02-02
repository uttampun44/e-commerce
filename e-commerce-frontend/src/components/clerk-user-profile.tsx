/**
 * Example Clerk User Button Component
 * Shows how to implement user profile dropdown with Clerk
 */

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function ClerkUserProfile() {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        {/* When user is signed in, show their profile menu */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
              userButtonPopoverCard: "shadow-lg",
              userButtonPopoverActionButton: "text-red-600 hover:bg-red-50",
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>

      <SignedOut>
        {/* When user is not signed in, show login button */}
        <div className="flex gap-2">
          <Link to="/clerk-login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/clerk-signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}

/**
 * Example of how to use in your Header or Topbar component:
 * 
 * import { ClerkUserProfile } from "@/components/clerk-user-profile";
 * 
 * export function Header() {
 *   return (
 *     <header>
 *       <nav>
 *         <div>Logo</div>
 *         <div>Menu items</div>
 *         <ClerkUserProfile />
 *       </nav>
 *     </header>
 *   );
 * }
 */
