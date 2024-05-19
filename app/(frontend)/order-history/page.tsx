import { Metadata } from 'next'
import Myorders from './Myorders'

export const metadata: Metadata = {
  title: 'Order History',
}
export default function OrderHistory() {
  return (
    <>
      <h1 className="py-4 text-3xl font-bold text-center text-black">Order History</h1>
      <Myorders />
    </>
  )
}