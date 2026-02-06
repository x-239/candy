"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCartStore from "../stores/cartStore";

const ShoppingCartIcon = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative group">
      <Link href="/cart">
        <div className="bg-[#fecdd4] rounded-full p-1.5">
          <ShoppingCart className="w-5 h-5 text-[#9f123c]" />
        </div>
        {/* Counter */}
        {totalItems > 0 && (
          <span className="absolute -top-3 -right-1 text-sm px-1">
            {totalItems}
          </span>
        )}
        {/* Tooltip */}
        <span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2
                     bg-black text-white text-xs px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     whitespace-nowrap"
        >
          Cart
        </span>
      </Link>
    </div>
  );
};

export default ShoppingCartIcon;
