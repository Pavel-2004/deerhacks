import Image from 'next/image'
import { Inter } from 'next/font/google'
import AssignmentsMenu from '../components/AssignmentsMenu.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const assignments = [
    {
      name: 'Math homework 1',
      description: 'Complete exercises 1-10 on page 47',
      dueDate: '2023-05-03',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'Math homework 1',
      description: 'Complete exercises 1-10 on page 47',
      dueDate: '2023-05-03',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'Math homework 1',
      description: 'Complete exercises 1-10 on page 47',
      dueDate: '2023-05-03',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'Math homework 1',
      description: 'Complete exercises 1-10 on page 47',
      dueDate: '2023-05-03',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'Math homework 1',
      description: 'Complete exercises 1-10 on page 47',
      dueDate: '2023-05-03',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'Math quiz',
      description: 'Answer questions on algebraic equations',
      dueDate: '2023-05-05',
      sectionId: 1,
      sectionName: 'Math'
    },
    {
      name: 'History essay',
      description: 'Write a 3-page essay on the causes of World War II',
      dueDate: '2023-05-05',
      sectionId: 2,
      sectionName: 'World History'
    },
    {
      name: 'Science lab report',
      description: 'Write a lab report on the effect of temperature on enzyme activity',
      dueDate: '2023-05-07',
      sectionId: 3,
      sectionName: 'Biology'
    },
    {
      name: 'English reading',
      description: 'Read chapters 5-7 of "To Kill a Mockingbird"',
      dueDate: '2023-05-01',
      sectionId: 4,
      sectionName: 'English Literature'
    }
  ];

  return (
    <div>
      <AssignmentsMenu assignments={assignments}/>
    </div>
  )
}
