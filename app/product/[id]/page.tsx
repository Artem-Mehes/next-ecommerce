import Image from "next/image";
import { Product as ProductType } from "@/app/page";
import { formatPrice } from "@/utils/price";

interface ProductProps {
  searchParams: ProductType;
}

export default async function Product({
  searchParams: { image, name, description, unit_amount },
}: ProductProps) {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image src={image} alt={name} width={600} height={600} />

      <div className="font-medium text-gray-700">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-medium py-2">{name}</h1>
          <p>{description}</p>
          <p className="font-bold text-teal-700">
            {unit_amount ? formatPrice(unit_amount) : "N/A"}
          </p>
        </div>

        <button className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
          Add to cart
        </button>
      </div>
    </div>
  );
}
