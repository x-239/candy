import { Suspense } from "react";
import CartWrapper from "./CartWrapper";

function CartPage() {
  return (
    <Suspense>
      <CartWrapper />;
    </Suspense>
  );
}

export default CartPage;
