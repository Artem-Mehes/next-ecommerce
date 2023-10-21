import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { stripe, prisma } from "@/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) return res.status(400).send("Missing the stripe signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return res.status(400).send("Webhook error" + error);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: "complete" },
        });
      }
      break;
    default:
      console.log("Unhandled event type" + event.type);
  }

  res.json({ received: true });
}
