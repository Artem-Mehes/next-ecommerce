import Image from "next/image";
import { Product } from "@/app/page";
import { formatPrice } from "@/utils/price";
import Link from "next/link";

export default function Product({
  id,
  name,
  image,
  unit_amount,
  description,
}: Product) {
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: {
          id,
          name,
          image,
          unit_amount,
          description,
        },
      }}
    >
      <div className="flex gap-6 flex-col">
        <Image
          priority
          alt={name}
          src={image}
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="font-medium ">
          <h2>{name}</h2>
          <p className="text-sm text-primary">
            {unit_amount ? formatPrice(unit_amount) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}
