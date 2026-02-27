import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col gap-2 md:gap-0  items-center md:flex-row md:items-start md:justify-between p-8 bg-pink-100/50 rounded-xl">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.jpeg"
            alt="BlossomCandy"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9 rounded-full"
          />
          <p className="hidden md:block text-shadow-md text-sm text-gray-500 font-mono tracking-wider">
            BLOSSOM CANDY
          </p>
        </Link>
        <p className="text-gray-500 text-sm">
          بنسويلكم ازكى بوكيهات الكاندي لجميع المناسبات
        </p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start ">
        <p className="text-black font-light">روابط سريعة</p>
        <Link href="/" className="hover:text-pink-200">
          الرئيسية
        </Link>
        <Link
          href="/products"
          className="hover:text-pink-200"
        >
          منتجاتنا
        </Link>
        <Link href="/" className="hover:text-pink-200">
          مين احنا
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <h4 className="text-gray-500  ">تابعنا</h4>
        <a
          href="https://www.instagram.com/blossom_candy0/"
          target="_blank"
          className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-300 transition-all hover:text-white "
        >
          <Instagram />
        </a>
      </div>

      {/* <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start ">
        <p className="text-black font-light">روابط سريعة</p>
        <Link href="/" target="_blank" className="hover:text-pink-200">
          الرئيسية
        </Link>
        <Link
          href="/"
          target="_blank"
          className="hover:text-pink-200"
        >
          منتجاتنا
        </Link>
        <Link href="/" target="_blank" className="hover:text-pink-200">
          مين احنا
        </Link>
      </div> */}
    </div>
  );
};

export default Footer;
