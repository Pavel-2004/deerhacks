import Image from 'next/image'
import { Inter } from 'next/font/google'
import { MiniCalendar } from '../components/MiniCalendar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MiniCalendar />
  )
}
