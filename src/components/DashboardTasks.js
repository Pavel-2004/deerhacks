import { useState } from "react";


export default function DashboardTasks(props) {
    const [selectedTime, setSelectedTime] = useState(null)
  
    const intervals = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`
        intervals.push(time)
      }
    }
    
    return (
        <div>
          {intervals.map((interval) => {
            const tasksForInterval = props.tasks.filter((task) =>  task.time === interval);
            return (
              <div
                key={interval}
                className={`interval ${selectedTime === interval ? "selected" : ""}`}
                onClick={() => setSelectedTime(interval)}
              >
                <div>{interval}</div>
                {tasksForInterval.map((task) => (
                  <div key={task.id}>{task.name}</div>
                ))}
              </div>
            );
          })}
        </div>
      );
  }

// view of the component is jsut the task after clicking on the task
// list of tasks
// use .foreach method
