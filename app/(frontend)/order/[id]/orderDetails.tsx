// "use client";
// import { OrderItem } from "@/lib/models/OrderModel";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import useSWR from "swr";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function OrderDetails({ orderId }: { orderId: string }) {
//   const { data: session } = useSession();
//   const { data, error, mutate } = useSWR(`/api/orders/${orderId}`);
//   const [isLoading, setIsLoading] = useState(false);

//   if (error) return error.message;
//   if (!data) return "Loading...";

//   const {
//     paymentMethod,
//     shippingAddress,
//     items,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     isPending,
//     isProcessing,
//     isDelivered,
//     deliveredAt,
//     isPaid,
//     paidAt,
//   } = data;

//   const isAdmin = session?.user?.isAdmin;

//   const markAsPending = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/admin/orders/${orderId}/pending`, {
//         method: "PUT",
//       });
//       if (res.ok) {
//         toast.success("Order marked as pending");
//         mutate();
//       } else {
//         const data = await res.json();
//         toast.error(data.message || "Failed to mark as pending");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to mark as pending");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const markAsProcessing = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/admin/orders/${orderId}/process`, {
//         method: "PUT",
//       });
//       if (res.ok) {
//         toast.success("Order marked as processing");
//         mutate();
//       } else {
//         const data = await res.json();
//         toast.error(data.message || "Failed to mark as processing");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to mark as processing");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const markAsPaid = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/admin/orders/${orderId}/pay`, {
//         method: "PUT",
//       });
//       if (res.ok) {
//         toast.success("Order marked as paid");
//         mutate();
//       } else {
//         const data = await res.json();
//         toast.error(data.message || "Failed to mark as paid");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to mark as paid");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const markAsDelivered = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
//         method: "PUT",
//       });
//       if (res.ok) {
//         toast.success("Order marked as delivered");
//         mutate();
//       } else {
//         const data = await res.json();
//         toast.error(data.message || "Failed to mark as delivered");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to mark as delivered");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-[80%] mx-auto">
//       <h1 className="text-2xl py-4 text-center">Order {orderId}</h1>
//       <div className="grid md:grid-cols-4 gap-5 my-4">
//         <div className="md:col-span-3">
//           <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="card-body">
//               <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue p-4">
//                 Shipping Address
//               </h2>
//               <div className="px-4 pb-2">
//                 <p>{shippingAddress.fullName}</p>
//                 <p>
//                   {shippingAddress.address}, {shippingAddress.city},{" "}
//                   {shippingAddress.postalCode}, {shippingAddress.country}{" "}
//                 </p>
//                 <div
//                   className={`${
//                     isDelivered ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {isDelivered
//                     ? `Delivered at ${deliveredAt}`
//                     : "Not Delivered"}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-4">
//             <div className="card-body">
//               <h2 className="card-title text-lg font-semibold  mb-4 text-white bg-blue p-4">
//                 Payment Method
//               </h2>
//               <div className="px-4 pb-2">
//                 <p>{paymentMethod}</p>
//                 <div
//                   className={`${isPaid ? "text-green-500" : "text-red-500"}`}
//                 >
//                   {isPaid ? `Paid at ${paidAt}` : "Not Paid"}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-4">
//             <div className="card-body">
//               <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue p-4">
//                 Items
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="table-auto w-full">
//                   <thead>
//                     <tr className="text-left">
//                       <th className="px-4 py-2">Item</th>
//                       <th className="px-4 py-2">Quantity</th>
//                       <th className="px-4 py-2">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {items.map((item: OrderItem) => (
//                       <tr key={item.slug} className="border-t border-gray-200">
//                         <td className="px-4 py-2">
//                           <Link
//                             href={`/product/${item.slug}`}
//                             className="flex items-center"
//                           >
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               width={50}
//                               height={50}
//                               className="rounded-lg"
//                             />
//                             <span className="px-2">
//                               {item.name} ({item.color} {item.size})
//                             </span>
//                           </Link>
//                         </td>
//                         <td className="px-4 py-2">{item.qty}</td>
//                         <td className="px-4 py-2">₹{item.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="card-body">
//               <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue  p-4">
//                 Order Summary
//               </h2>
//               <div className="px-4">
//                 <ul>
//                   <li>
//                     <div className="mb-2 flex justify-between">
//                       <div>Items</div>
//                       <div>₹{itemsPrice}</div>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="mb-2 flex justify-between">
//                       <div>Tax</div>
//                       <div>₹{taxPrice}</div>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="mb-2 flex justify-between">
//                       <div>Shipping</div>
//                       <div>₹{shippingPrice}</div>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="mb-2 flex justify-between">
//                       <div>Total</div>
//                       <div>₹{totalPrice}</div>
//                     </div>
//                   </li>
//                 </ul>
//                 {isAdmin && (
//                   <div className="mt-4">
//                     {!isPending && (
//                       <button
//                         onClick={markAsPending}
//                         className="btn btn-success w-full mb-2"
//                         disabled={isLoading}
//                       >
//                         Mark as Pending
//                       </button>
//                     )}
//                     {!isProcessing && (
//                       <button
//                         onClick={markAsProcessing}
//                         className="btn btn-success w-full mb-2"
//                         disabled={isLoading}
//                       >
//                         Mark as Processing
//                       </button>
//                     )}
//                     {!isPaid && (
//                       <button
//                         onClick={markAsPaid}
//                         className="btn btn-success w-full mb-2"
//                         disabled={isLoading}
//                       >
//                         Mark as Paid
//                       </button>
//                     )}
//                     {!isDelivered && (
//                       <button
//                         onClick={markAsDelivered}
//                         className="btn btn-success w-full mb-4"
//                         disabled={isLoading}
//                       >
//                         Mark as Delivered
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { OrderItem } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetails({ orderId }: { orderId: string }) {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR(`/api/orders/${orderId}`);
  const [isLoading, setIsLoading] = useState(false);

  if (error) return error.message;
  if (!data) return "Loading...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPending,
    isProcessing,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  const isAdmin = session?.user?.isAdmin;

  const markAsPending = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/pending`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("Order marked as pending");
        mutate();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to mark as pending");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to mark as pending");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsProcessing = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/process`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("Order marked as processing");
        mutate();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to mark as processing");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to mark as processing");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsPaid = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/pay`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("Order marked as paid");
        mutate();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to mark as paid");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to mark as paid");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsDelivered = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("Order marked as delivered");
        mutate();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to mark as delivered");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to mark as delivered");
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressBarWidth = () => {
    if (isDelivered) return "100%";
    if (isProcessing) return "50%";
    if (isPending) return "5%";
    return "0%";
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl py-4 text-center">Order {orderId}</h1>
      <div className="grid md:grid-cols-4 gap-5 my-4">
        <div className="md:col-span-3">
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue p-4">
                Shipping Address
              </h2>
              <div className="px-4 pb-2">
                <p>{shippingAddress.fullName}</p>
                <p>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}{" "}
                </p>
                <div
                  className={`${
                    isDelivered ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isDelivered
                    ? `Delivered at ${deliveredAt}`
                    : "Not Delivered"}
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold  mb-4 text-white bg-blue p-4">
                Payment Method
              </h2>
              <div className="px-4 pb-2">
                <p>{paymentMethod}</p>
                <div
                  className={`${isPaid ? "text-green-500" : "text-red-500"}`}
                >
                  {isPaid ? `Paid at ${paidAt}` : "Not Paid"}
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue p-4">
                Items
              </h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2">Item</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: OrderItem) => (
                      <tr key={item.slug} className="border-t border-gray-200">
                        <td className="px-4 py-2">
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded-lg"
                            />
                            <span className="px-2">
                              {item.name} ({item.color} {item.size})
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-2">{item.qty}</td>
                        <td className="px-4 py-2">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold mb-4 text-white bg-blue  p-4">
                Order Summary
              </h2>
              <div className="px-4">
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>₹{itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>₹{taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div>₹{shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>₹{totalPrice}</div>
                    </div>
                  </li>
                </ul>

                {/* Progress Bar */}
                <div className="my-4">
                  <div className="flex justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isPending ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      Pending
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isProcessing ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      Processing
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isDelivered ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      Delivered
                    </span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="absolute h-full rounded-full bg-green-500"
                      style={{ width: getProgressBarWidth() }}
                    ></div>
                  </div>
                </div>
                {isAdmin && (
                  <div className="mt-4">
                    {!isPending && (
                      <button
                        onClick={markAsPending}
                        className="btn btn-success w-full mb-2"
                        disabled={isLoading}
                      >
                        Mark as Pending
                      </button>
                    )}
                    {!isProcessing && (
                      <button
                        onClick={markAsProcessing}
                        className="btn btn-success w-full mb-2"
                        disabled={isLoading}
                      >
                        Mark as Processing
                      </button>
                    )}
                    {!isPaid && (
                      <button
                        onClick={markAsPaid}
                        className="btn btn-success w-full mb-2"
                        disabled={isLoading}
                      >
                        Mark as Paid
                      </button>
                    )}
                    {!isDelivered && (
                      <button
                        onClick={markAsDelivered}
                        className="btn btn-success w-full mb-4"
                        disabled={isLoading}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
