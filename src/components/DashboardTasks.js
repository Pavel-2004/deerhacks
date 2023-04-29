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

    function handleClick(interval, taskName, taskId, taskDescription) {
        const taskElement = document.getElementById(`task-${taskId}`);
        if(taskElement.textContent === taskDescription) {
            taskElement.innerHTML = 
                `
                  <div>${interval}</div>
                  <div>${taskName}</div>
                `;
        } else {
            taskElement.textContent = taskDescription;
        }
    }

    return (
        <div className="hourly-calendar">
          {intervals.map((interval) => {
            const tasksForInterval = props.tasks.filter((task) => task.time === interval);
            
            return (
              <div
                key={interval}
                className={`w-full interval ${selectedTime === interval ? "selected" : ""}`}
                onClick={() => setSelectedTime(interval)}
              >
                {tasksForInterval.length ? (
                    tasksForInterval.map((task) => (
                    <div className="task-by-interval interval-has-task" key={task.id} id={`task-${task.id}`} 
                                onClick={() => handleClick(interval, task.name, task.id, task.description)}
                                style={{cursor: `pointer`, width: `${100 / tasksForInterval.length}%`, transition: '250ms' }}>
                        <div>{interval}</div>
                        <div>{task.name}</div>
                    </div>
                    ))
                ) : (
                    <div className="task-by-interval" style={{ display: "inline-block", width: `100%` }}>{interval}</div>
                )}
              </div>
            );
          })}
        </div>
      );
  }

// view of the component is jsut the task after clicking on the task
// list of tasks
// use .foreach method
