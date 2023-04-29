import Image from 'next/image'
import { Inter } from 'next/font/google'
import GradesMenu from '@/components/gradesMenu';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const assignments = [
    {
      sectionId: 1,
      sectionName: 'Math',
      assignmentName: 'Algebra Homework',
      description: 'Solve problems 1-10 on page 53.',
      grade: 85,
      datePublished: '2023-04-28'
    },
    {
      sectionId: 2,
      sectionName: 'English',
      assignmentName: 'Essay on Hamlet',
      description: 'Write a 5-paragraph essay on the themes of Hamlet.',
      grade: null,
      datePublished: '2023-04-28'
    },
    {
      sectionId: 3,
      sectionName: 'Science',
      assignmentName: 'Lab Report',
      description: 'Write a report on the results of the experiment.',
      grade: 92,
      datePublished: '2023-04-26'
    },
    {
      sectionId: 1,
      sectionName: 'Math',
      assignmentName: 'Geometry Quiz',
      description: 'Multiple-choice quiz on chapter 5.',
      grade: 70,
      datePublished: '2023-04-25'
    }
  ];

  return (
    <div>
      <GradesMenu assignments={assignments} />
    </div>
  )
}
