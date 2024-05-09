// import data from '@/lib/data';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function ProductDetails({
//     params,
//   }: {
//     params: { slug: string }
//   }) {
// //     console.log('params.slug:', params.slug);
// // console.log('data.products:', data.products);
//     const product = data.products.find((x) => x.slug === params.slug);
//     if (!product) {
//       return <div>Product not found</div>
//     }
//     return (
//       <>
//         <div className="my-2">
//           <Link href="/">back to products</Link>
//         </div>
//         <div className="grid md:grid-cols-4 md:gap-3">
//         <div className="md:col-span-2">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={640}
//               height={640}
//               sizes="100vw"
//               style={{
//                 width: '100%',
//                 height: 'auto',
//               }}
//             ></Image>
//         </div>
//         <div>
//           <ul className="space-y-4">
//             <li>
//               <h1 className="text-xl">{product.name}</h1>
//             </li>
//             <li>
//                 {product.rating} of {product.numReviews} reviews
//             </li>
//             <li> {product.brand} </li>
//             <li>
//                 <div className="divider"></div>
//             </li>
//             <li>
//                 Description: <p>{product.description}</p>
//             </li>
//             </ul>
//         </div>
//             <div>
//           <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
//             <div className="card-body">
//               <div className="mb-2 flex justify-between">
//                 <div>Price</div>
//                 <div>${product.price}</div>
//               </div>
//               <div className="mb-2 flex justify-between">
//                 <div>Status</div>
//                 <div>
//                   {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
//                 </div>
//               </div>
//             <div className="card-actions justify-center">
//               <button className="btn btn-primary w-full" type="button">
//                Add to cart
//               </button>
//             </div>
//             </div>
//             </div>
//             </div>
//         </div>
//     </>
//   )
// }
    





import data from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetails({ params }: { params: { slug: string } }) {
  // Fetch the product by slug
  const product = data.products.find((x) => x.slug === params.slug);
  if (!product) {
    return <div className="text-dark-grey">Product not found</div>;
  }

  return (
    <>
      {/* Back to products link */}
      <div className="my-2 text-primary font-semibold">
        <Link href="/">Back to products</Link>
      </div>

      {/* Grid layout for product details */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 lg:gap-8">

        {/* Product image */}
        <div className="md:col-span-1 lg:col-span-1">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            className="rounded-lg shadow-lg"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>

        {/* Product information and purchase card on the right side of the image */}
        <div className="md:col-span-1 lg:col-span-1">
          {/* Product details */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-primary mb-2">{product.name}</h1>
            <p className="text-secondary mb-2">{product.rating} out of {product.numReviews} reviews</p>
            <p className="text-dark-grey mb-2"><strong>Brand:</strong> {product.brand}</p>
            <hr className="border-light-grey my-2" />
            <p className="text-dark-grey mb-4"><strong>Description:</strong> {product.description}</p>
          </div>

          {/* Purchase card */}
          <div className="card bg-white shadow-lg rounded-lg p-4">
            <div className="card-body">
              <div className="mb-3">
                <div className="text-dark-grey font-semibold">Price</div>
                <div className="text-accent font-semibold text-lg">${product.price}</div>
              </div>
              <div className="mb-3">
                <div className="text-dark-grey font-semibold">Status</div>
                <div>
                  {product.countInStock > 0 ? (
                    <span className="text-cta font-semibold">In stock</span>
                  ) : (
                    <span className="text-red-600">Unavailable</span>
                  )}
                </div>
              </div>
              {/* Add to cart button */}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary w-full rounded-lg bg-cta text-white py-2"
                  type="button"
                  disabled={product.countInStock === 0}
                  // onClick={() => console.log('Add to cart')}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}