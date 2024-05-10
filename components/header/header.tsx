import Link from 'next/link'
import React from 'react'
import Menu from './Menu';


const header = () => {
  return (
    <>
     <nav className='text-white'>
      <div className='bg-primary flex justify-between px-4 py-1 items-center'>
        <Link href='/' className='text-2xl'>Ecom</Link>
        <Menu/>
      </div>
     </nav>   
    </>
  )
}

export default header
