import { SubmitHandler, useForm } from "react-hook-form";
import { ShippingFormInput, shippingFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInput>({
    resolver: zodResolver(shippingFormSchema),
  });
  const router = useRouter();
  const handleShippingForm: SubmitHandler<ShippingFormInput> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };
  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      {/* NAME */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Abdulnour"
          {...register("name")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      {/* EMAIL*/}
      <div className="flex flex-col gap-1">
        <label htmlFor="emil" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="example@hotmail.com"
          {...register("email")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        )}
      </div>
      {/* Phone*/}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-semibold">
          Phone number
        </label>
        <input
          type="text"
          id="phone"
          placeholder="123456789"
          maxLength={10}
          {...register("phone")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      {/* ADDRESS */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm font-semibold">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Marj-AL-Hamam"
          {...register("address")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
      {/* CITY */}
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm font-semibold">
          City
        </label>
        <input
          type="text"
          id="city"
          placeholder="Amman"
          {...register("city")}
          className="border-b border-gray-500 rounded-md outline-0 px-1.5"
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-pink-200 flex items-center justify-center gap-2 rounded-full py-1.5 border border-pink-300 hover:bg-black hover:border-0 hover:text-white transition font-semibold"
      >
        استمرار
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

export default ShippingForm;
