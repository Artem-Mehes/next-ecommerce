import { authOptions } from "@/config";
import { getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { formatPrice } from "@/utils/price";
import Image from "next/image";
import prisma from "@/db";

export const revalidate = 0;

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const user = session?.user as AdapterUser | undefined;

  if (!user) return <div>You need to be logged in</div>;

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      products: true,
    },
  });

  return (
    <div className="pb-5">
      <h1 className="font-bold text-2xl mb-5">
        {orders.length ? "Your orders" : "No orders"}
      </h1>

      <div className="font-medium flex flex-col gap-10">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg flex p-4 flex-col gap-5 bg-base-200"
          >
            <div>
              <h2 className="font-bold">Order reference {order.id}</h2>
              <p>Time: {order.createdDate.toString()}</p>
              <p className="text-md">
                Status:{" "}
                <span
                  className={`${
                    order.status === "complete" ? "bg-primary" : "bg-orange-500"
                  } text-white py-1 rounded-md px-2 mx-2 text-sm`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="flex gap-8">
              {order.products.map((product) => (
                <div key={product.id}>
                  <h2>{product.name}</h2>
                  <div className="flex gap-4 flex-col md:flex-row md:items-center">
                    {product.image && (
                      <Image
                        width={36}
                        height={36}
                        alt={product.name}
                        src={product.image}
                      />
                    )}
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-extrabold">Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
