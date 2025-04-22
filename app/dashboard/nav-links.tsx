"use client";
import {
  DocumentDuplicateIcon,
  UserGroupIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((data) => {
        const LinkIcon = data.icon;
        return (
          <Link
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            key={data.name}
            href={data.href}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{data.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
