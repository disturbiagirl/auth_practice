import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./SigninButton";
import Link from "next/link";

export default function Appbar() {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link
            className="hover:text-sky-500 transition-all"
            color="foreground"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
