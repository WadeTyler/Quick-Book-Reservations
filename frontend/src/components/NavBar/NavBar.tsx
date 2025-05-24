import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import AuthOnly from "@/features/auth/components/AuthOnly";
import UnAuthOnly from "@/features/auth/components/UnAuthOnly";
import {Button} from "@/components/ui/button";
import UserOptions from "@/components/NavBar/UserOptions";
import ModeToggle from "@/components/theme/ModeToggle";
import MobileNav from "@/components/NavBar/MobileNav";

export default function NavBar() {



  return (
    <div className="fixed top-0 w-full bg-background/95 shadow-xl h-24 z-50">
      <nav className="container w-full py-6 flex items-center gap-8">
        <header className="mr-auto">
          <Link href={"/"}>
            <BrandLogo />
          </Link>
        </header>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <AuthOnly showLoader={false}>
            <Link href={"/dashboard"}>Dashboard</Link>
            <ModeToggle />
            <UserOptions />
          </AuthOnly>

          <UnAuthOnly showLoader={false}>
            <ModeToggle />
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>
              <Button>Signup</Button>
            </Link>
          </UnAuthOnly>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />

      </nav>
    </div>
  )
}

