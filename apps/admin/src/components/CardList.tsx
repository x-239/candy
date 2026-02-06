import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularProducts = [
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

const latestTransactions = [
  {
    id: 1,
    title: "Order paymenet",
    badge: "John Doe",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 2,
    title: "Payment for Services",
    badge: "Jane Smith",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100,
  },
  {
    id: 3,
    title: "Order paymenet",
    badge: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300,
  },
  {
    id: 4,
    title: "Payment for Services",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: 5,
    title: "Order paymenet",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
];

const CardList = ({ title }: { title: string }) => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products"
          ? popularProducts.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={item.variants[0].imageUrl}
                    alt={item.variants[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.variants[0].name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0">
                  ${item.variants[0].price}K
                </CardFooter>
              </Card>
            ))
          : latestTransactions.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <Badge variant="secondary">{item.badge}</Badge>
                </CardContent>
                <CardFooter className="p-0">${item.count / 1000}K</CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CardList;
