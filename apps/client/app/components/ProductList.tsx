"use client";
import { ProductTypes } from "../types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";

const products: ProductTypes = [
  {
    id: 1,
    variants: [
      {
        name: "بوكيه كاندي كبير",
        size: "كبير",
        price: 8,
        imageUrl: "/candy2.jpeg",
        description:
          "بوكيه كاندي فاخر وكبير، مليان ألوان وزاهي، مثالي للهدايا الكبيرة والمناسبات الخاصة.",
      },
      {
        name: "بوكيه كاندي صغير",
        size: "صغير",
        price: 5,
        imageUrl: "/candy1.jpeg",
        description: "بوكيه كاندي صغير وخلابو مناسب كهدية لطيفة او تذكارية",
      },
    ],
  },
  {
    id: 2,
    variants: [
      {
        name: "كاسة كاندي كبيرة",
        size: "كبير",
        price: 2.5,
        imageUrl: "/candy7.jpeg",
        description:
          "كاسة كاندي كبيرة، مليانة حلويات متنوعة، مثالية للمشاركة أو كهدية فخمة للأطفال.",
      },
      {
        name: "كاسة كاندي صغيرة",
        size: "صغير",
        price: 1.25,
        imageUrl: "/candy8.jpeg",
        description:
          "كاسة كاندي صغيرة، لطيفة وسهلة الحمل، مثالية كهدايا صغيرة أو مكافآت للأطفال.",
      },
    ],
  },
  {
    id: 3,
    variants: [
      {
        name: "كيكة كاندي كبيرة",
        size: "كبير",
        price: 15,
        imageUrl: "/candy5.jpeg",
        description:
          "كيك كاندي كبير، تصميم ممتع وملون، يسرق الأنظار في أي حفلة أو مناسبة.",
      },
      {
        name: "كيكة كاندي صغيرة",
        size: "صغير",
        price: 8,
        imageUrl: "/candy6.jpeg",
        description: "كيك كاندي صغير، حلو ومثالي للكيك الفردي أو كهدية لطيفة.",
      },
    ],
  },
];

const ProductList = () => {
  return (
    <div>
      <Categories />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols- gap-4">
        {products.map((product) => (
          <div className="px-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
