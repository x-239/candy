import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";

const products = [
  {
    id: "1",
    variants: [
      {
        size: "كبير",
        name: "بوكيه كاندي كبير",
        price: 8,
        imageUrl: "/candy2.jpeg",
        description: "بوكيه كاندي فاخر وكبير...",
      },
      {
        size: "صغير",
        name: "بوكيه كاندي صغير",
        price: 5,
        imageUrl: "/candy1.jpeg",
        description: "بوكيه كاندي صغير ولطيف...",
      },
    ],
  },
];

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO: get the product from db
};
const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ size?: string }>;
}) => {
  const { id } = await params;
  const { size } = await searchParams;

  const product = products.find((p) => p.id === id);
  const selectedVariant =
    product?.variants.find((v) => v.size === size) ?? product?.variants[0];

  if (!product) {
    return <p>Product not found</p>;
  }

  if (!selectedVariant) {
    return <p>Variant not found</p>;
  }

  return (
    <div className="mt-12 flex flex-col gap-8 lg:flex-row px-16">
      {/* IMAGE */}
      <div className="relative h-96 w-full lg:w-5/12">
        <Image
          src={selectedVariant.imageUrl}
          alt={selectedVariant.name}
          fill
          className="object-contain rounded-lmd"
        />
      </div>

      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{selectedVariant.name}</h1>
        <p className="text-gray-600">{selectedVariant.description}</p>
        <h2 className="font-semibold text-2xl">
          ${selectedVariant.price.toFixed(2)} د.أ
        </h2>
        <ProductInteraction
          product={product}
          selectedVariant={selectedVariant}
        />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/cards.png"
            alt="visa card"
            height={25}
            width={50}
            className="rounded-md"
          />
          <Image
            src="/click.png"
            alt="Click instant payment"
            height={25}
            width={50}
            className="rounded-md bg-white"
          />
          <Image
            src="/zain.png"
            alt="Zain cash"
            height={25}
            width={50}
            className="rounded-md bg-white"
          />
        </div>
        <p>
          By clicking Pay Now, you agree to our Terms & Conditions and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
