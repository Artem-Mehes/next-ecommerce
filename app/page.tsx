import { stripe } from "@/config";
import Product from "@/app/components/product";

const getProducts = async () => {
  const products = await stripe.products.list();

  return await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });

      return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: prices.data[0].currency,
        unit_amount: prices.data[0].unit_amount,
      };
    }),
  );
};

export type Product = Awaited<ReturnType<typeof getProducts>>[number];

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="grid grid-cols-fluid gap-16">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
