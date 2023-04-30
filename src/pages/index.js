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

  const tasks = [
    { id: 1, name: 'Task 1', time: '01:30', duration: 0.5, description: 'Do task 1' },
    { id: 10, name: 'same', time: '01:30', duration: 0.5, description: 'Do the same task' },
    { id: 11, name: 'another', time: '01:30', duration: 0.5, description: 'Do another task' },
    { id: 2, name: 'Task 2', time: '02:00', duration: 1, description: 'Do task 2' },
    { id: 3, name: 'Task 3', time: '04:30', duration: 2, description: 'Do task 3' },
    { id: 4, name: 'Task 4', time: '06:00', duration: 1, description: 'Do task 4' },
    { id: 5, name: 'Task 5', time: '11:00', duration: 2, description: 'Do task 5' },
    { id: 6, name: 'Task 6', time: '15:30', duration: 1, description: 'Do task 6' },
    { id: 7, name: 'Task 7', time: '16:30', duration: 2, description: 'Do task 7' },
    { id: 8, name: 'Task 8', time: '18:00', duration: 1, description: 'Do task 8' },
  ];

  return (
    <div>
      <DashboardTasks tasks={tasks} />
    </div>
  );
}

//specifically get a time on the clock in the date object in javascript
