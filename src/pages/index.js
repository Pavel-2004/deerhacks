import Image from 'next/image'
import { Inter } from 'next/font/google'
import DashboardTasks from '@/components/DashboardTasks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
