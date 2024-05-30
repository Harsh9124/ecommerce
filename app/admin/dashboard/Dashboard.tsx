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
    <div className="p-4 bg-light-grey">
      <div className="my-4 stats inline-grid md:flex shadow stats-vertical md:stats-horizontal">
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2">
          <div className="stat-title text-dark-grey">Sales</div>
          <div className="stat-value text-primary">
            ${formatNumber(summary.ordersPrice)}
          </div>
          <div className="stat-desc">
            <Link href="/admin/orders" className="link-details">
              View sales
            </Link>
          </div>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2">
          <div className="stat-title text-dark-grey">Orders</div>
          <div className="stat-value text-primary">{summary.ordersCount}</div>
          <div className="stat-desc">
            <Link href="/admin/orders" className="link-details">
              View orders
            </Link>
          </div>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2">
          <div className="stat-title text-dark-grey">Products</div>
          <div className="stat-value text-primary">{summary.productsCount}</div>
          <div className="stat-desc">
            <Link href="/admin/products" className="link-details">
              View products
            </Link>
          </div>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md m-2">
          <div className="stat-title text-dark-grey">Users</div>
          <div className="stat-value text-primary">{summary.usersCount}</div>
          <div className="stat-desc">
            <Link href="/admin/users" className="link-details">
              View users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
