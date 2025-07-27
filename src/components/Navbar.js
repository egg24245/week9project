"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const linkClass = (path) =>
    pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
        </li>

        {isSignedIn ? (
          <li className="dropdown-container">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="nav-link dropdown-trigger" type="button">
                  {"please choose"} ▼
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                className="dropdown-content"
                side="bottom"
                align="start"
              >
                <DropdownMenu.Item asChild>
                  <Link href="/profiles" className="dropdown-link">
                    Profiles
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <Link href="/user/me" className="dropdown-link">
                    My Profile
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <Link href="/make-post" className="dropdown-link">
                    Make Post
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="dropdown-separator" />

                <DropdownMenu.Item asChild>
                  <button
                    onClick={() => signOut()}
                    className="dropdown-link signout-button"
                    type="button"
                  >
                    Sign Out
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        ) : (
          <>
            {[
              { href: "/sign-in", label: "Sign In" },
              { href: "/sign-up", label: "Sign Up" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  );
}
