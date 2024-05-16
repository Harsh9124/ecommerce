// 'use client'
// import { Order } from '@/lib/models/OrderModel'
// import Link from 'next/link'
// import useSWR from 'swr'

// export default function Orders() {
//   const { data: orders, error } = useSWR(`/api/admin/orders`)
//   if (error) return 'An error has occurred.'
//   if (!orders) return 'Loading...'

//   return (
//     <div>
//       <h1 className="py-4 text-2xl">Orders</h1>
//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>USER</th>
//               <th>DATE</th>
//               <th>TOTAL</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order: Order) => (
//               <tr key={order._id}>
//                 <td>..{order._id.substring(20, 24)}</td>
//                 <td>{order.user?.name || 'Deleted user'}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>${order.totalPrice}</td>
//                 <td>
//                   {order.isPaid && order.paidAt
//                     ? `${order.paidAt.substring(0, 10)}`
//                     : 'not paid'}
//                 </td>
//                 <td>
//                   {order.isDelivered && order.deliveredAt
//                     ? `${order.deliveredAt.substring(0, 10)}`
//                     : 'not delivered'}
//                 </td>
//                 <td>
//                   <Link href={`/order/${order._id}`} passHref>
//                     Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import useSWR from "swr";

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`);
  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="p-4">
      <h1 className="py-4 text-2xl">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">USER</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">PAID</th>
              <th className="px-4 py-2">DELIVERED</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="px-4 py-2">..{order._id.substring(20, 24)}</td>
                <td className="px-4 py-2">
                  {order.user?.name || "Deleted user"}
                </td>
                <td className="px-4 py-2">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="px-4 py-2">${order.totalPrice}</td>
                <td className="px-4 py-2">
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "not paid"}
                </td>
                <td className="px-4 py-2">
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : "not delivered"}
                </td>
                <td className="px-4 py-2">
                  <Link href={`/order/${order._id}`} passHref>
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
