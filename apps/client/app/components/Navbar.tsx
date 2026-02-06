import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="bg-white/50  sticky p-3 top-0 z-50 backdrop:blur-2xl border-b pb-4 border-gray-200">
      <nav className="w-full pl-6 flex items-center justify-between">
        {/* LEFT */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.jpeg"
            alt="BlossomCandy"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9 rounded-full"
          />
          <p className=" hidden md:block text-shadow-md font-mono tracking-wider">
            BLOSSOM CANDY
          </p>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center pr-5 gap-6 rounded-lg">
          <SearchBar />
          <Link href="/">
            <div className=" relative group">
              <div className="bg-[#fecdd4] rounded-full p-1.5">
                <Home className="h-5 w-5  text-[#9f123c]" />
              </div>
              <span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2
              bg-black text-white text-xs px-2 py-1 rounded
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              whitespace-nowrap"
              >
                Home
              </span>
            </div>
          </Link>
          <Link href="/">
            <div className="relative group">
              <div className="bg-[#fecdd4] rounded-full p-1.5">
                <Bell className="h-5 w-5 text-[#9f123c]" />
              </div>
              <span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2
                     bg-black text-white text-xs px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     whitespace-nowrap"
              >
                Notfications
              </span>
            </div>
          </Link>
          <ShoppingCartIcon />
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          {/* Show the user button when the user is signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
