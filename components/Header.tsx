"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="shrink-0 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:max-w-4xl sm:px-6 md:max-w-5xl md:px-8 lg:max-w-6xl lg:px-10">
        <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 shrink items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 sm:gap-3"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 text-neutral-800 sm:h-10 sm:w-10"
            />
            <span className="truncate text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
              chooseyourchoice
            </span>
            <span className="hidden shrink-0 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 sm:inline md:ml-1">
              Anonymous feedback
            </span>
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-x-4 text-sm sm:flex sm:gap-x-6 md:gap-x-8"
            aria-label="Main"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md py-2 px-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 ${
                  pathname === href
                    ? "text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 sm:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="mt-3 flex flex-col gap-0 border-t border-neutral-100 pt-3 sm:hidden"
            aria-label="Main mobile"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`rounded-lg py-3 px-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-inset ${
                  pathname === href
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
