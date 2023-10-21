import Image from "next/image";
import { Product as ProductType } from "@/app/page";
import { formatPrice } from "@/utils/price";
import AddToCart from "./add-to-cart";

interface ProductProps {
  searchParams: ProductType;
}

export default async function Product({ searchParams }: ProductProps) {
  const { image, name, description, unit_amount } = searchParams;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-12 mt-8">
      <Image
        src={image}
        alt={name}
        width={600}
        height={600}
        className="w-full rounded-lg"
      />

      <div className="font-medium">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-medium py-2">{name}</h1>
          <p>{description}</p>
          <p className="font-bold text-primary">
            {unit_amount ? formatPrice(unit_amount) : "N/A"}
          </p>
        </div>

        <AddToCart {...searchParams} />
      </div>
    </div>
  );
}
