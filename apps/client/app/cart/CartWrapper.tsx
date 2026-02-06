"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Minus, Trash2 } from "lucide-react";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { useState } from "react";
import Image from "next/image";
import { ShippingFormInput } from "../types";
import useCartStore from "../stores/cartStore";

// -------------------- STEPS --------------------
const steps = [
  { id: 1, title: "Shopping cart" },
  { id: 2, title: "Shipping Adress" },
  { id: 3, title: "Payment Method" },
];

// -------------------- CART ITEMS (OBJECT) --------------------
// const cartItems = {
//   1: {
//     id: 1,
//     variants: [
//       {
//         name: "بوكيه كاندي كبير",
//         price: 8,
//         imageUrl: "/candy2.jpeg",
//         description:
//           "بوكيه كاندي فاخر وكبير، مليان ألوان وزاهي، مثالي للهدايا الكبيرة والمناسبات الخاصة.",
//       },
//       {
//         name: "بوكيه كاندي صغير",
//         price: 5,
//         imageUrl: "/candy1.jpeg",
//         description: "بوكيه كاندي صغير وخلابو مناسب كهدية لطيفة او تذكارية",
//       },
//     ],
//     quantity: 1,
//     selectedSize: "كبير",
//   },

//   2: {
//     id: 2,
//     variants: [
//       {
//         name: "كاسة كاندي كبيرة",
//         price: 2.5,
//         imageUrl: "/candy7.jpeg",
//         description:
//           "كاسة كاندي كبيرة، مليانة حلويات متنوعة، مثالية للمشاركة أو كهدية فخمة للأطفال.",
//       },
//       {
//         name: "كاسة كاندي صغيرة",
//         price: 1.25,
//         imageUrl: "/candy8.jpeg",
//         description:
//           "كاسة كاندي صغيرة، لطيفة وسهلة الحمل، مثالية كهدايا صغيرة أو مكافآت للأطفال.",
//       },
//     ],
//     quantity: 1,
//     selectedSize: "كبير",
//   },

//   3: {
//     id: 3,
//     variants: [
//       {
//         name: "كيكة كاندي كبيرة",
//         price: 15,
//         imageUrl: "/candy5.jpeg",
//         description:
//           "كيك كاندي كبير، تصميم ممتع وملون، يسرق الأنظار في أي حفلة أو مناسبة.",
//       },
//       {
//         name: "كيكة كاندي صغيرة",
//         price: 8,
//         imageUrl: "/candy6.jpeg",
//         description: "كيك كاندي صغير، حلو ومثالي للكيك الفردي أو كهدية لطيفة.",
//       },
//     ],
//     quantity: 1,
//     selectedSize: "كبير",
//   },
// };

// -------------------- COMPONENT --------------------
const CartWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInput>();

  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart } = useCartStore();
  const cartArray = Object.values(cart);

  const totalPrice = cartArray.reduce((acc, item) => {
    const selectedVariant = item.variants.find((v) =>
      v.name.includes(item.selectedSize),
    );
    return acc + (selectedVariant?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep === step.id
                  ? "bg-pink-300 text-black"
                  : "bg-white text-pink-200"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`${
                activeStep === step.id ? "text-[#d83293]" : "text-pink-200"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* LEFT */}
        <div className="w-full lg:w-7/12 shadow-lg border border-pink-100 p-8 rounded-lg flex flex-col gap-8 bg-[#f3f0f7]">
          {activeStep === 1 &&
            cart.map((item) => {
              const selectedVariant = item.variants.find((v) =>
                v.name.includes(item.selectedSize),
              );

              return (
                <div
                  key={item.uid}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-8">
                    {/* IMAGE */}
                    <div className="relative h-32 w-32">
                      <Image
                        src={selectedVariant?.imageUrl as string}
                        alt={selectedVariant?.name ?? ""}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    {/* DETAILS */}
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[#382843]">
                          {selectedVariant?.name}
                        </p>
                        <p className="font-semibold text-sm text-[#a88fbd]">
                          عدد: {item.quantity}
                        </p>
                        <p className="font-semibold text-sm text-[#a88fbd]">
                          حجم: {item.selectedSize}
                        </p>
                      </div>
                      <p className="font-semibold text-[#382843]">
                        ${selectedVariant?.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => removeFromCart(item.uid)}
                    className="border border-[#fda4b1] bg-[#fecdd4] text-[#9f123c] rounded-full p-1 cursor-pointer hover:text-red-600 transition"
                  >
                    <div className="relative group cursor-pointer">
                      <Trash2 className="w-5 h-5 transition-all duration-150 group-hover:opacity-0 group-hover:scale-90" />
                      <Minus className="w-5 h-5 absolute top-0 left-0 opacity-0 scale-90 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100" />
                    </div>
                  </div>
                </div>
              );
            })}

          {activeStep === 2 && (
            <ShippingForm setShippingForm={setShippingForm} />
          )}
          {activeStep === 3 && shippingForm && <PaymentForm />}
          {activeStep === 3 && !shippingForm && (
            <p className="text-lg text-red-600">
              Please fill the shipping form!
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-5/12 shadow-lg border border-pink-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold text-pink-400">-:معلومات السلة</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-pink-400 font-semibold">
              <p>${totalPrice.toFixed(2)}</p>
              <p>المجموع</p>
            </div>

            <div className="flex justify-between text-pink-400 font-semibold">
              <p>10 د.أ</p>
              <p>%الخصم 10</p>
            </div>

            <div className="flex justify-between text-pink-400 font-semibold">
              <p>10 د.أ</p>
              <p>التوصيل</p>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <p className="text-pink-400">${totalPrice.toFixed(2)}</p>
              <p className="text-pink-950">المجموع الكلي</p>
            </div>
          </div>

          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="bg-pink-200 flex items-center justify-center gap-2 rounded-full py-1.5 border border-pink-300 hover:bg-black hover:border-0 hover:text-white transition font-semibold"
            >
              استمرار
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartWrapper;
