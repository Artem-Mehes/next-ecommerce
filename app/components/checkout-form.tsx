import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";
import { formatPrice, getOrderAmount } from "@/utils/price";
import { ProcessingLoader } from "@/app/components/processing-loader";
import { useCartStore } from "@/store";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const cartStore = useCartStore();

  const [isLoading, setIsLoading] = useState(false);

  const orderAmount = getOrderAmount(cartStore.cart);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await stripe!.confirmPayment({
      elements: elements!,
      redirect: "if_required",
    });

    if (!result.error) {
      cartStore.setViewType("success");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={onSubmit} className="flex flex-col gap-8">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1>
        Total price:{" "}
        <span className="font-bold">{formatPrice(orderAmount)}</span>
      </h1>
      <button
        id="submit"
        className="bg-teal-700 rounded-md text-white p-2 disabled:opacity-25"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          <ProcessingLoader isLoading={isLoading}>Pay now 🔥</ProcessingLoader>
        </span>
      </button>
    </form>
  );
}
