import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

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
          <Button as={Link} color="primary" href="/auth/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
