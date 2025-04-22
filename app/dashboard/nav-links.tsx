"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILink {
  href: string;
  title: string;
}

const links: ILink[] = [
  {
    href: "#",
    title: "test",
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((data) => (
        <Link key={data.title} href={data.href}>
          <p className="hidden md:block">{data.title}</p>
        </Link>
      ))}
    </>
  );
}

export default NavLinks;
