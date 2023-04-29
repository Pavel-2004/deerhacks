import Image from 'next/image'
import { Inter } from 'next/font/google'
import SkillsMenu from '@/components/skillsMenu'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const skills = ['Math', 'Reading', 'Writing', 'Programming'];

  return (
    <div>
      <SkillsMenu skills={skills}/>
    </div>
  )
}
