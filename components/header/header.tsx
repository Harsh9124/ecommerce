import Link from 'next/link'
import React from 'react'
import { BsCart4 } from "react-icons/bs";


const header = () => {
  return (
    <>
     <nav className='text-white'>
      <div className='bg-primary flex justify-between px-4 py-1 items-center'>
        <Link href='/' className='text-2xl'>Ecom</Link>
        <ul className='flex gap-7 items-center text-md'>
          <li>
            <Link href='/products'>SignIn</Link>
          </li>
          <li>
            <Link href='/cart'><BsCart4 /></Link>
          </li>
        </ul>
      </div>
     </nav>   
    </>
  )
}

export default header
