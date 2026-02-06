"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { ProductType, ProductVariant } from "../types";
import { useState } from "react";
import useCartStore from "../stores/cartStore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const ProductInteraction = ({
  product,
  selectedVariant,
}: {
  product: ProductType;
  selectedVariant: ProductVariant;
}) => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    addToCart({
      uid: uuidv4(),
      id: product.id,
      quantity,
      selectedSize: selectedVariant.name,
      variants: [
        {
          name: selectedVariant.name,
          price: selectedVariant.price,
          imageUrl: selectedVariant.imageUrl,
          size: selectedVariant.size,
          description: selectedVariant.description,
        },
      ],
    });
    toast.success("🥰تمت الاضافة الى السلة بنجاح شكرا");
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* COLORS: THIS ONE FOR LATER */}
      <div className="flex flex-col gap-2 text-sm">
        {/* this property will be shown only in the product page! but we will be able to add them in our cart */}
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">الكمية:</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-200 p-1 "
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-200 p-1 "
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-pink-200 flex items-center justify-center gap-2 rounded-full py-1.5 border cursor-pointer border-pink-300 hover:border-0 hover:bg-black  hover:text-white transition text-sm font-semibold shadow-lg"
      >
        <Plus className="h-4 w-4" />
        أضف الى السلة
      </button>
      <button className="flex items-center justify-center gap-2 rounded-full py-1.5 border border-gray-300 transition cursor-pointer font-semibold shadow-lg">
        <ShoppingCart className="h-4 w-4" />
        شراء
      </button>
    </div>
  );
};

export default ProductInteraction;
