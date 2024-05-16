// 'use client'
// import { Product } from '@/lib/models/ProductModel'
// import { formatId } from '@/lib/utils'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import useSWR from 'swr'
// import useSWRMutation from 'swr/mutation'

// export default function Products() {
//   const { data: products, error } = useSWR(`/api/admin/products`)

//   const router = useRouter()

//   const { trigger: deleteProduct } = useSWRMutation(
//     `/api/admin/products`,
//     async (url, { arg }: { arg: { productId: string } }) => {
//       const toastId = toast.loading('Deleting product...')
//       const res = await fetch(`${url}/${arg.productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const data = await res.json()
//       res.ok
//         ? toast.success('Product deleted successfully', {
//             id: toastId,
//           })
//         : toast.error(data.message, {
//             id: toastId,
//           })
//     }
//   )

//   const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
//     `/api/admin/products`,
//     async (url) => {
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const data = await res.json()
//       if (!res.ok) return toast.error(data.message)

//       toast.success('Product created successfully')
//       router.push(`/admin/products/${data.product._id}`)
//     }
//   )

//   if (error) return 'An error has occurred.'
//   if (!products) return 'Loading...'

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h1 className="py-4 text-2xl">Products</h1>
//         <button
//           disabled={isCreating}
//           onClick={() => createProduct()}
//           className="btn btn-primary btn-sm"
//         >
//           {isCreating && <span className="loading loading-spinner"></span>}
//           Create
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>name</th>
//               <th>price</th>
//               <th>category</th>
//               <th>count in stock</th>
//               <th>rating</th>
//               <th>actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product: Product) => (
//               <tr key={product._id}>
//                 <td>{formatId(product._id!)}</td>
//                 <td>{product.name}</td>
//                 <td>${product.price}</td>
//                 <td>{product.category}</td>
//                 <td>{product.countInStock}</td>
//                 <td>{product.rating}</td>
//                 <td>
//                   <Link
//                     href={`/admin/products/${product._id}`}
//                     type="button"
//                     className="btn btn-ghost btn-sm"
//                   >
//                     Edit
//                   </Link>
//                   &nbsp;
//                   <button
//                     onClick={() => deleteProduct({ productId: product._id! })}
//                     type="button"
//                     className="btn btn-ghost btn-sm"
//                   >
//                     Delete
//                   </button>
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
import { Product } from "@/lib/models/ProductModel";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Products() {
  const { data: products, error } = useSWR(`/api/admin/products`);
  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading("Deleting product...");
      const res = await fetch(`${url}/${arg.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Product deleted successfully", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Product created successfully");
      router.push(`/admin/products/${data.product._id}`);
    }
  );

  if (error) return "An error has occurred.";
  if (!products) return "Loading...";

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Products</h1>
        <button
          disabled={isCreating}
          onClick={() => createProduct()}
          className="btn btn-primary btn-sm flex items-center"
        >
          {isCreating && <span className="loading loading-spinner mr-2"></span>}
          Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Count in Stock</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <div className="text-center">{formatId(product._id!)}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">{product.name}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">${product.price}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">{product.category}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">{product.countInStock}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">{product.rating}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-center">
                    <Link href={`/admin/products/${product._id}`} passHref>
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct({ productId: product._id! })}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
