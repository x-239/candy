"use client";

import { Beaker, Dessert, Lollipop, Rose } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <Lollipop className="h-4 w-4" />,
    slug: "all",
  },
  {
    name: "Boqute",
    icon: <Rose className="h-4 w-4" />,
    slug: "boqute",
  },
  {
    name: "Cup",
    icon: <Beaker className="h-4 w-4" />,
    slug: "cup",
  },
  {
    name: "Cake",
    icon: <Dessert className="h-4 w-4" />,
    slug: "cake",
  },
];

const Categories = () => {
  const searhParams = useSearchParams();

  const router = useRouter();
  const pathName = usePathname();
  const selectedCategory = searhParams.get("category");
  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searhParams);
    params.set("category", value || "all");
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-1 bg-pink-100/30 p-2 rounded-md mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap cursor-pointer px-2 py-1 rounded-md ${category.slug === selectedCategory ? "bg-white" : "text-gray-500"}`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
