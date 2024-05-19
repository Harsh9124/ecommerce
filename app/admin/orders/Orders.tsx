"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import useSWR from "swr";

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`);
  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="p-4 my-5 bg-primary rounded-lg">
      <h1 className="py-4 text-2xl font-semibold">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-primary text-white bg-blue">
              <th className="px-4 py-2 rounded-s-lg">ID</th>
              <th className="px-4 py-2">USER</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">PAID</th>
              <th className="px-4 py-2">DELIVERED</th>
              <th className="px-4 py-2 rounded-e-lg">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-center">..{order._id.substring(20, 24)}</td>
                <td className="px-4 py-2">
                  {order.user?.name || "Deleted user"}
                </td>
                <td className="px-4 py-2 text-center">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="px-4 py-2 text-center">₹{order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "not paid"}
                </td>
                <td className="px-4 py-2 text-center">
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : "not delivered"}
                </td>
                <td className="px-4 py-2 text-center">
                  <Link href={`/order/${order._id}`} passHref className="hover:font-semibold">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
