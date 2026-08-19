import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const productPictures = [
  "galaxy-s24.png",
  "airpods-pro.png",
  "macbook-air.png",
  "ipad-air.png",
];

// http://localhost:3000/product
export default async function ProductPage() {
  await connection(); // signals this is a dynamic route
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });
  
  // แปลง Decimal → number ก่อนส่งให้ Client Component
  const serializedProducts = products.map((product, index) => ({
    id: product.id,
    name: product.name ?? "ไม่มีชื่อสินค้า",
    price: Number(product.price ?? 0),
    picture: productPictures[index % productPictures.length],
  }))

  return (
    <main>
      {/* { products.length> 0 && JSON.stringify(products) } */}
      {
        serializedProducts.length > 0 && <FeaturesProduct products={serializedProducts} />
      }
    </main>
  );
}
