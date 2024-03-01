import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import SigninButton from "./SigninButton";

export default function Appbar() {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Features
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
