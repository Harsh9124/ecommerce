"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function MyOrders() {
  const router = useRouter();
  const { data: orders, error } = useSWR(`/api/orders/mine`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
      <table className="table w-full border-collapse">
        <thead>
          <tr className="table-header">
            <th className="table-cell">ID</th>
            <th className="table-cell">DATE</th>
            <th className="table-cell">TOTAL</th>
            <th className="table-cell">PAID</th>
            <th className="table-cell">DELIVERED</th>
            <th className="table-cell">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id} className="table-row">
              <td className="table-cell">
                <div className="text-center">{order._id.substring(20, 24)}</div>
              </td>
              <td className="table-cell">
                <div className="text-center">
                  {order.createdAt.substring(0, 10)}
                </div>
              </td>
              <td className="table-cell">
                <div className="text-center">₹{order.totalPrice}</div>
              </td>
              <td className="table-cell">
                <div className="text-center">
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "not paid"}
                </div>
              </td>
              <td className="table-cell">
                <div className="text-center">
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : "not delivered"}
                </div>
              </td>
              <td className="table-cell">
                <div className="text-center">
                  <Link href={`/order/${order._id}`} passHref>
                    Details
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
