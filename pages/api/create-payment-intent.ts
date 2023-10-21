import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config";
import { getOrderAmount } from "@/utils/price";
import { AdapterUser } from "next-auth/adapters";
import { CartProduct } from "@/store";
import prisma from "@/db";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

interface Request extends NextApiRequest {
  body: {
    items: CartProduct[];
    payment_intent_id?: string;
  };
}

export default async function handler(req: Request, res: NextApiResponse) {
  const userSession = await getServerSession(req, res, authOptions);

  if (!userSession?.user) {
    return res.status(403).json({ message: "Not logged in" });
  }

  const { items, payment_intent_id } = req.body;

  const orderAmount = getOrderAmount(items);

  const products = items.map((item) => ({
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    description: item.description,
    unit_amount: Number(item.unit_amount),
  }));

  const orderData = {
    currency: "usd",
    status: "pending",
    amount: orderAmount,
    user: { connect: { id: (userSession.user as AdapterUser).id } },
    paymentIntentID: payment_intent_id,
    products: {
      create: products,
    },
  };

  // If exists just update the order
  if (payment_intent_id) {
    const currentIntent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: orderAmount,
        },
      );

      // Fetch order with product ids

      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentID: updatedIntent.id },
        include: { products: true },
      });

      if (!existingOrder) {
        return res.status(400).json({ message: "Invalid payment intent" });
      }

      await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          amount: orderAmount,
          products: {
            deleteMany: {},
            create: products,
          },
        },
      });

      return res.status(200).json(updatedIntent);
    }
  } else {
    // Create new order

    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return res.status(200).json(paymentIntent);
  }
}
