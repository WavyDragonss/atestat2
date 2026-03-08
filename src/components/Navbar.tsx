"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/algorithms", label: "Algorithms" },
  { href: "/cpp-examples", label: "C++ Examples" },
  { href: "/bac-problems", label: "BAC Problems" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/concepts", label: "Concepts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link href="/" className="brand">
          AlgoVerse
        </Link>

        <ul className="nav-list">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
