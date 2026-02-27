"use client";

import { useState } from "react";
import { ProductType, ProductVariant } from "repo-types";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import useCartStore from "../stores/cartStore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const ProductCard = ({ product }: { product: ProductType }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );

  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    addToCart({
      uid: uuidv4(),
      id: product.id,
      quantity: 1,
      selectedSize: selectedVariant.name,
      categorySlug: "dummy4", //Dummy
      created: new Date(), //Dummy
      updatedAt: new Date(), //Dummy
      variants: [
        {
          id: 0, // Dummy for now
          productId: product.id, //
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
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border">
      <Link
        href={`/products/${product.id}?size=${encodeURIComponent(selectedVariant.size ?? selectedVariant.name)}`}
      >
        <div className="aspect-square overflow-hidden">
          <ImageWithFallback
            src={selectedVariant.imageUrl}
            alt={selectedVariant.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="inline-flex items-center space-x-2 mb-6 bg-pink-50 px-4 py-2 rounded-full border border-pink-300">
            <Sparkles className="h-4 w-4 text-pink-300" />
            <span className="text-pink-300 ">صنع بحب</span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <select
          value={selectedVariant.name}
          onChange={(e) => {
            const newVariant = product.variants.find(
              (v) => v.name === e.target.value,
            );
            if (newVariant) setSelectedVariant(newVariant);
          }}
          className="rounded-full p-1 mb-1 border border-pink-300 bg-white text-pink-300 hover:bg-pink-50 hover:text-black transition"
        >
          {product.variants.map((variant) => (
            <option key={variant.name} value={variant.name}>
              {variant.name} - د.أ {variant.price.toFixed(2)}
            </option>
          ))}
        </select>

        <h3 className="mb-2 text-card-foreground font-semibold text-lg">
          {selectedVariant.name}
        </h3>
        <p className="text-pink-600 pb-4">{selectedVariant.description}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={handleAddToCart}
            className="flex items-center text-sm gap-2 rounded-full px-4 py-1 border border-pink-300 bg-white text-pink-300 hover:bg-pink-50 hover:text-black transition cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            اضف للسلة
          </button>
          <p className="font-bold text-pink-500">
            د.أ ${selectedVariant.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
