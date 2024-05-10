'use client'

import useCartService from "@/lib/hooks/useCartStore"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CartDetails() {
    const router = useRouter()
    const { items, itemsPrice, decrease, increase } = useCartService()

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <></>

    return (
        <>
            <h1 className="py-4 text-2xl font-semibold">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="font-semibold">
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="col-span-3">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-xl">
                                        <th className="w-1/3">Item</th>
                                        <th className="w-1/3">Quantity</th>
                                        <th className="w-1/3">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.slug}>
                                            <td>
                                                <Link href={`/product/${item.slug}`} className="flex w-auto items-center">
                                                    <Image src={item.image} alt={item.name} width={100} height={100} className="m-3  bg-white shadow-lg rounded-lg" />
                                                    <span className="px-2 text-xl font-bold">{item.name}</span>
                                                </Link>
                                            </td>

                                            <td className="flex justify-center mt-12  text-xl font-bold">
                                                <button className="btn" type="button" onClick={() => decrease(item)}>-</button>
                                                <span className="px-2">{item.qty}</span>
                                                <button className="btn" type="button" onClick={() => increase(item)}>+</button>
                                            </td>
                                            <td>
                                                <div className="flex justify-center text-xl font-bold">${item.price}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="card bg-white shadow-lg rounded-lg p-4">
                            <div className="card-body">
                                <ul>
                                    <li>
                                        <div className="text-accent font-semibold text-lg mx-8 my-7">
                                            Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : ${itemsPrice}
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={() => router.push('/shipping')} className="btn btn-primary w-full rounded-lg bg-cta text-black py-2">
                                            Proceed to Checkout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
