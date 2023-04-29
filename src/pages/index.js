import Image from 'next/image'
import { Inter } from 'next/font/google'
import DashboardTasks from '@/components/dashboardTasks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const tasks = [
    { id: 1, name: 'Task 1', time: '01:30' },
    { id: 2, name: 'Task 2', time: '02:00' },
    { id: 3, name: 'Task 3', time: '04:30' },
    { id: 4, name: 'Task 4', time: '06:00' },
    { id: 5, name: 'Task 5', time: '11:00' },
    { id: 6, name: 'Task 6', time: '15:30' },
    { id: 7, name: 'Task 7', time: '16:30' },
    { id: 8, name: 'Task 8', time: '18:00' },
  ]
  console.log(new Date());
  return (
    <div>
      <DashboardTasks tasks={tasks} />
    </div>
  );
}

//specifically get a time on the clock in the date object in javascript
