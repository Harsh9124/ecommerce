'use client'
import { BsCart4 } from "react-icons/bs";
import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Menu = () => {
    const { items} = useCartService()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
      setMounted(true)
    }, [])
    return(
        <div>
         <ul className="flex gap-7 items-center text-md">
            <li>
                <Link className="btn btn-ghost rounded-btn" href="/cart">
                <BsCart4 className="text-2xl" />
                {mounted && items.length != 0 && (
                    <div className="badge badge-secondary bg-red-600 rounded-md items-center">
                    {items.reduce((a, c) => a + c.qty, 0)}{' '}
                    </div>
                )}
                </Link>
            </li>
            <li>
              <button
                className="btn btn-ghost rounded-btn"
                type="button">
                Sign in
              </button>
            </li>
        </ul>
     </div>
          
    )
}
export default Menu