import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<Product[]> => {
  return [
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
          description:
            "كيك كاندي صغير، حلو ومثالي للكيك الفردي أو كهدية لطيفة.",
        },
      ],
    },
  ];
};

const PaymentsPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PaymentsPage;
