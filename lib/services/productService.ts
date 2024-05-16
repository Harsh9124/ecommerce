import { cache } from "react";
import dbConnect from "@/lib/dbConnect";
import ProductModel, { Product } from "@/lib/models/ProductModel";

export const revalidate = 3600;

const getLatest = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(6)
    .lean();
  return products as Product[];
});

const getFeatured = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean();
  return products as Product[];
});

const getBySlug = cache(async (slug: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return product as Product;
});

const PAGE_SIZE = 3;
const getByQuery = cache(
  async ({
    q,
    category,
    page = "1",
  }: {
    q: string;
    category: string;
    page: string;
  }) => {
    await dbConnect();

    const queryFilter =
      q && q !== "all"
        ? {
            name: {
              $regex: q,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};

    const products = await ProductModel.find(
      {
        ...queryFilter,
        ...categoryFilter,
      },
      "-reviews"
    )
      .sort({ _id: -1 })
      .skip(PAGE_SIZE * (Number(page) - 1))
      .limit(PAGE_SIZE)
      .lean();

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
    });

    return {
      products: products as Product[],
      countProducts,
      page,
      pages: Math.ceil(countProducts / PAGE_SIZE),
    };
  }
);

const getCategories = cache(async () => {
  await dbConnect();
  const categories = await ProductModel.find().distinct("category");
  return categories;
});

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getCategories,
};
export default productService;
