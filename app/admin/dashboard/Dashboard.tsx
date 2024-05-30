"use client";
import Link from "next/link";
import useSWR from "swr";
import { formatNumber } from "@/lib/utils";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`);

  if (error) return <div className="text-error">{error.message}</div>;
  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-4 my-5 bg-primary rounded-lg">
      <h1 className="py-4 text-2xl font-semibold">DashBoard</h1>
      <div className="flex flex-row">
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2 w-1/2">
          <div className="stat-title font-semibold text-xl">Sales</div>
          <div className="stat-value text-lime-500 my-2 text-lg ">
            ₹{formatNumber(summary.ordersPrice)}
          </div>
          <div className="stat-desc">
            <Link href="/admin/orders" className="text-blue-600">
              View sales
            </Link>
          </div>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2 w-1/2">
          <div className="stat-title font-semibold text-xl">Orders Placed</div>
          <div className="stat-value  text-lime-500 my-2 text-lg">
            {summary.ordersCount}
          </div>
          <div className="stat-desc">
            <Link href="/admin/orders" className="text-blue-600">
              View orders
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2 w-1/2">
          <div className="stat-title font-semibold text-xl">Products</div>
          <div className="stat-value text-lime-500 my-2 text-lg">
            {summary.productsCount}
          </div>
          <div className="stat-desc">
            <Link href="/admin/products" className="text-blue-600">
              View products
            </Link>
          </div>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2 w-1/2">
          <div className="stat-title font-semibold text-xl">Users</div>
          <div className="stat-value text-lime-500 my-2 text-lg">
            {summary.usersCount}
          </div>
          <div className="stat-desc">
            <Link href="/admin/users" className="text-blue-600">
              View users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
