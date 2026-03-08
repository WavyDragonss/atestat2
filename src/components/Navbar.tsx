"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Acasa" },
  { href: "/visualizer", label: "Vizualizator" },
  { href: "/atestate", label: "Atestate" },
  { href: "/algorithms", label: "Algoritmi" },
  { href: "/bac-problems", label: "Probleme BAC" },
  { href: "/concepts", label: "Concepte" },
  { href: "/about", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link href="/" className="brand">
          Wavy's Corner
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
