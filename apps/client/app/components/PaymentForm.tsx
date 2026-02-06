import { SubmitHandler, useForm } from "react-hook-form";
import { PaymentFormInputs, paymentFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log("Payment submitted", data);
  };

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      {/* CARD HOLDER */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolder" className="text-sm font-semibold">
          Card Holder
        </label>
        <input
          type="text"
          id="cardHolder"
          placeholder="Abdulnour"
          {...register("cardHolder")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.cardHolder && (
          <p className="text-sm text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>

      {/* CARD NUMBER */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="text-sm font-semibold">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxLength={16}
          {...register("cardNumber")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      {/* EXPIRATION DATE */}
      <div className="flex flex-col gap-1">
        <label htmlFor="expirationDate" className="text-sm font-semibold">
          Expiration Date
        </label>
        <input
          type="text"
          id="expirationDate"
          placeholder="01/32"
          {...register("expirationDate")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.expirationDate && (
          <p className="text-sm text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      {/* CVV */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-sm font-semibold">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          placeholder="123"
          {...register("cvv")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.cvv && (
          <p className="text-sm text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/cards.png"
          alt="visa card"
          height={25}
          width={50}
          className="rounded-md"
        />
        <Image
          src="/click.png"
          alt="Click instant payment"
          height={25}
          width={50}
          className="rounded-md bg-white"
        />
        <Image
          src="/zain.png"
          alt="Zain cash"
          height={25}
          width={50}
          className="rounded-md bg-white"
        />
      </div>
      <button
        type="submit"
        className="bg-pink-200 flex items-center justify-center gap-2 rounded-full py-1.5 border border-pink-300 hover:bg-black hover:border-0 hover:text-white transition font-semibold"
      >
        تأكيد
        <ShoppingCart className="h-4 w-4" />
      </button>
    </form>
  );
};

export default PaymentForm;
