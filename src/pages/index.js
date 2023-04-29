import Image from 'next/image'
import { Inter } from 'next/font/google'
import { CalenderTask } from '../components/CalenderTask'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <CalenderTask />
  )
}
