"use client";

import { useAuth } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemsType, ShippingFormInput } from "repo-types";
import useCartStore from "@/stores/cartStore";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cart),
    },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to create payment intent");
  }

  return json.clientSecret;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInput;
}) => {
  const { cart } = useCartStore();
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  useEffect(() => {
    if (!token) return;

    fetchClientSecret(cart, token).then(setClientSecret).catch(console.error);
  }, [token, cart]);

  if (!clientSecret)
    return (
      <div>
        Please fill the payment form to avoid any abuses to the website!
      </div>
    );

  return (
    <Elements stripe={stripe} options={{ clientSecret }}>
      <CheckoutForm shippingForm={shippingForm} />
    </Elements>
  );
};

export default StripePaymentForm;
