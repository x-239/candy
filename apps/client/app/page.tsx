import { Sparkles } from "lucide-react";
import Link from "next/link";
import ProductList from "./components/ProductList";
const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <>
      <div className=" relative aspect-3/1">
        <section className="relative  from-muted to-background py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-6 bg-pink-50 px-4 py-2 rounded-full border border-pink-300">
              <Sparkles className="h-4 w-4 text-pink-300" />
              <span className="text-pink-300 ">صنع بحب</span>
            </div>
            <h1 className="mb-6 text-2xl text-gray-400 max-w-3xl mx-auto">
              كل اهداء نحليه بطابع من السكر
            </h1>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-2xl">
              مش بس سكاكر… هاي لحظة فرح. كل بوكيه معمول بحب عشان يوصل الشعور قبل
              الطعم.
            </p>
            <div className="flex flex-wrap gap-4 justify-center p-4">
              <Link
                href={category ? `/products/?category=${category}` : "/products"}
                className="rounded-full px-16 py-2 border border-pink-300 bg-white text-pink-300 hover:bg-pink-50 hover:text-black transition"
              >
                منتجاتنا
              </Link>
            </div>
          </div>
        </section>
      </div>
      <ProductList />
    </>
  );
};

export default HomePage;
