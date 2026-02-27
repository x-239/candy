"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import { ShippingFormInput } from "repo-types";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInput;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StripeError | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Optionally pass shipping info
        shipping: {
          name: shippingForm.name,
          address: {
            line1: shippingForm.address,
            city: shippingForm.city,
            country: "JO",
          },
        },
        receipt_email: shippingForm.email,
      },
      redirect: "if_required",
    });
    if (result.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePay}>
      <PaymentElement options={{ layout: "accordion" }} />

      <button disabled={loading}>{loading ? "Loading..." : "Pay"}</button>

      {error && <div>{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
