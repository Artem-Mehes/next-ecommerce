"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/app/components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Checkout() {
  const router = useRouter();

  const cartStore = useCartStore();

  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getPaymentIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartStore.cart,
          payment_intent_id: cartStore.paymentIntent,
        }),
      });

      if (res.status === 403) {
        router.push("/api/auth/signin");
        return;
      }

      const paymentIntent = await res.json();

      setClientSecret(paymentIntent.client_secret);
      cartStore.setPaymentIntent(paymentIntent.id);
    };

    getPaymentIntent();
  }, []);

  if (!clientSecret)
    return (
      <div className="flex items-center justify-center my-10 opacity-75">
        <AiOutlineLoading3Quarters size={50} className="animate-spin" />
      </div>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        locale: "en",
        clientSecret: clientSecret,
        appearance: {
          theme: "stripe",
          labels: "floating",
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
