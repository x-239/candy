import { Suspense } from "react";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default ProductPage;
