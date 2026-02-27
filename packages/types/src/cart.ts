import type { ProductWithVariants } from "@repo/product-db";
import { z } from "zod";

export type CartItemType = ProductWithVariants & {
  uid: string;
  quantity: number;
  selectedSize: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z
    .string()
    .email()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    )
    .min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7-10 digits!")
    .max(10, "Phone number must be between 7-10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export type ShippingFormSchemaType = z.infer<typeof shippingFormSchema>;

export type ShippingFormInput = z.infer<typeof shippingFormSchema>;

// export const paymentFormSchema = z.object({
//   cardHolder: z.string().min(1, "Card holder is requried!"),
//   cardNumber: z
//     .string()
//     .min(16, "Card number is requried!")
//     .max(16, "Card number is requried!"),
//   expirationDate: z
//     .string()
//     .regex(
//       /^(0[1-9]|1[0-2])\/\d{2}$/,
//       "Expiration date must be in MM/YY format",
//     ),
//   cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
// });

// export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  /** persisted shipping form (undefined until submitted) */
  shippingForm?: ShippingFormInput;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (uid: string) => void;
  clearCart: () => void;
  setShippingForm: (data: ShippingFormInput) => void;
  clearShippingForm: () => void;
};
