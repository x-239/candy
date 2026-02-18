import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  // Product serivce backend
  const { getToken } = await auth();
  const token = await getToken();

  console.log(token);
  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();
  console.log(dataProduct);
  
  // Order serivce backend
  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();
  console.log(dataOrder);

  //  Payment serivce backend
  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();
  console.log(dataPayment);

  return <div>TestPage</div>;
};

export default TestPage;
