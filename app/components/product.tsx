import Image from "next/image";
import { Product } from "@/app/page";
import { formatPrice } from "@/utils/price";

export default function Product({ name, image, price }: Product) {
  return (
    <div className="text-gray-700 flex gap-6 flex-col">
      <Image
        alt={name}
        src={image}
        width={400}
        height={400}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="font-medium">
        <h2>{name}</h2>
        <p className="text-sm text-teal-700">
          {price ? formatPrice(price) : "N/A"}
        </p>
      </div>
    </div>
  );
}
