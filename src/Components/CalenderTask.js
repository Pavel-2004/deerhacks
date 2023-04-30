import React, { useState } from "react";

 export const CalenderTask = () => {
    const [date, setDate] = useState(new Date());

    const [selectedTask, setSelectedTask] = useState(null);

    const [tasks, setTasks] = useState([
        {
        startDate: "April 1, 23 00:00:00",
        time: 1,
        taskName: "Task 1",
        taskType: "Task Type 1",
        skills: ["Skill 1", "Skill 2"],
        },
        {
        startDate: "April 1, 23 00:00:00",
        time: 1,
        taskName: "Task 7",
        taskType: "Task Type 12",
        skills: ["Skill 11", "Skill 230"],
        },
        {
        startDate: "April 10, 23 00:00:00",
        time: 1,
        taskName: "Task 2",
        taskType: "Task Type 2",
        skills: ["Skill 1", "Skill 2"],
        },
        {
        startDate: "April 20, 23 00:00:00",
        time: 1,
        taskName: "Task 3",
        taskType: "Task Type 3",
        skills: ["Skill 1", "Skill 2"],
        },
        {
        startDate: "April 30, 23 00:00:00",
        time: 1,
        taskName: "Task 4",
        taskType: "Task Type 4",
        skills: ["Skill 1", "Skill 2"],
        },
        {
        startDate: "May 1, 23 00:00:00",
        time: 1,
        taskName: "Task 5",
        taskType: "Task Type 5",
        skills: ["Skill 1", "Skill 2"],
        },
        {
        startDate: "March 30 23 00:00:00",
        time: 1,
        taskName: "Task 6",
        taskType: "Task Type 6",
        skills: ["Skill 1", "Skill 2"],
        }
    ]);

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    }

    const lastDayOfMonth = (month, year) => {
        return new Date(year, month, daysInMonth(month, year)).getDay();
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = firstDayOfMonth(month, year);
    const lastDay = lastDayOfMonth(month, year);

    const daysInMonthArray = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
        daysInMonthArray.push(i);
    }

    const daysInMonthWithPadding = [];
    for (let i = 0; i < firstDay; i++) {
        daysInMonthWithPadding.push(null);
    }
    for (let i = 1; i <= daysInMonth(month, year); i++) {
        daysInMonthWithPadding.push(i);
    }
    for (let i = 0; i < 6 - lastDay; i++) {
        daysInMonthWithPadding.push(null);
    }

    const handlePrevMonthClick = () => {
        setDate(new Date(year, month - 1));
    }

    const handleNextMonthClick = () => {
        setDate(new Date(year, month + 1));
    }

    const handleTodayClick = () => {
        setDate(new Date());
    }

    const taskOpenHandler = (task) => {
        setSelectedTask(task);
    };
      
    return (
      <div className="All">
        {selectedTask ? (
          <div className="TaskMenu">
            <p className="TaskName">Task Name: {selectedTask.taskName}</p>
            <p className="TaskType">Task Type: {selectedTask.taskType}</p>
            <p className="TaskSkills">Skills: {selectedTask.skills.join(", ")}</p>
            <p className="TaskStart">Start Date: {selectedTask.startDate}</p>
            <p className="TaskTime">Time: {selectedTask.time}</p>
            <button className="TaskBack" onClick={() => setSelectedTask(null)}>Close</button>
          </div>
        ) : (
          <>
            <div className="Month">
              <h1>{date.toLocaleString('default', { month: 'long' })} {year}</h1>
            </div>
            <div className="DaysWeek">
              {days.map(day => <div className="EachDay">{day}</div>)}
            </div>
            <div className="Calendar">
              {Array.from({ length: Math.ceil(daysInMonthWithPadding.length / 7) }).map((_, weekIndex) => (
              <>
                <div key={weekIndex} className="Week">
                  {daysInMonthWithPadding.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                    <div key={dayIndex} className="Days">
                      <p>{day}</p>
                    </div>
                  ))}
                </div>
                <div className="Week">
                  {daysInMonthWithPadding.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                    <div key={dayIndex} className="Tasks">
                      {tasks.map((task, taskIndex) => {
                        const taskDate = new Date(task.startDate).getDate();
                        if (taskDate === day && month == new Date(task.startDate).getMonth() && year == new Date(task.startDate).getFullYear()) {
                          return (
                            <div key={taskIndex}>
                              <button onClick={() => taskOpenHandler(task)} className="TaskDisplay">{task.taskName}</button>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  ))}
                </div>
                </>
              ))}
            </div>
            <div className="Buttons">
              <button className="btn" onClick={handlePrevMonthClick}>Prev</button>
              <button className="btn" onClick={handleTodayClick}>Today</button>
              <button className="btn" onClick={handleNextMonthClick}>Next</button>
            </div>
          </>
        )}
      </div>
    );
}