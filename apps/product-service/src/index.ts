import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import dotenv from "dotenv";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import { prisma } from "@repo/product-db";

dotenv.config({ path: "./.env" });
// console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

// console.log("Prisma import test:", prisma instanceof Object);
// async function testDB() {
//   try {
//     await prisma.$connect();
//     console.log("DB connection successful!");
//   } catch (err) {
//     console.error("DB connection failed:", err);
//   }
// }

// testDB();
// async function testQuery() {
//   const isConnected = await prisma.$connect()
  
//   try {
//     const categories = await prisma.category.findMany();
//     console.log("Categories fetched:", categories);
//   } catch (err) {
//     console.error("Query failed:", err);
//   }
// }

// testQuery();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());
app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req, res) => {
  res.json({
    message: "product serivce are authenticated!",
    userId: req.userId,
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
});

app.listen(8000, () => {
  console.log("product service is running");
});
