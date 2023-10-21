"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/app/components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useCartStore, useThemeStore } from "@/store";
import orderLoading from "@/public/order-loading.json";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Checkout() {
  const router = useRouter();

  const cartStore = useCartStore();
  const themeStore = useThemeStore();

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
      <div className="mt-24 flex flex-col items-center">
        <motion.h1
          transition={{ delay: 0.5 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          className="text-2xl font-extrabold"
        >
          Prepping your order ✨
        </motion.h1>

        <Player src={orderLoading} autoplay loop />
      </div>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        locale: "en",
        clientSecret: clientSecret,
        appearance: {
          labels: "floating",
          theme: themeStore.mode === "dark" ? "night" : "stripe",
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
