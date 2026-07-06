"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Devotion",
      href: "/devotion",
      icon: "📖",
    },
    {
      name: "History",
      href: "/history",
      icon: "📚",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: "🏆",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: "👤",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">

      <div className="flex justify-around items-center py-3">

        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-sm ${
                active
                  ? "text-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="text-xs mt-1">
                {item.name}
              </span>
            </Link>
          );
        })}

      </div>

    </div>
  );
}