import React, { useState } from "react";

/**
 Using the date object find how much days there are in a month (that is being displayed) and find out 
 under which day i.e monday, tuesday,… the first and last fall under. 
 
 Construct the calendar using a table and format the dates how a regular calender would have i.e the 
 first of May 2023 falls on a monday and the 31st falls on a friday. 
 
 Using tailwind map out all of the valid days in the display by using flex col to create 4 rows and using 
 flex-row for create 7 day and each week. 
 
 We will also provide you with a list of JSON (dictionaries) showing  stored in the following format: 
 {startDate: string date and time, time: float, taskName, taskType, skills: []} while we are working on 
 an API create just a dummy variable which contains this and work around it. 
 
 Display all tasks that need to be done that day in the calendar format but only short bits for every day 
 possible so that the UI stays clean. 
 
 Once clicking on one of these tasks create a small pop up menu over the screen that shows all the task 
 details.
 */

 export const MiniCalendar = () => {
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

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysInMonthArray = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
        daysInMonthArray.push(i);
    }

    const handlePrevDayClick = () => {
        setDate(new Date(year, month, day - 1));
    }

    const handleNextDayClick = () => {
        setDate(new Date(year, month, day + 1));
    }

    const handleTodayClick = () => {
        setDate(new Date());
    }

    const taskOpenHandler = (task) => {
        setSelectedTask(task);
    };

    const weekDays = [];
    const firstDay = new Date(date);
    for (let i = 0; i < 5; i++) {
        const nextDay = new Date(firstDay);
        nextDay.setDate(firstDay.getDate() + i);
        weekDays.push(nextDay);
    }

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
                <h1>{date.toLocaleString('default', { month: 'long' })} {day}, {year}</h1>
              </div>

              <div className="Buttons">
                <button className="btn" onClick={handlePrevDayClick}>Prev</button>
                <button className="btn" onClick={handleTodayClick}>Today</button>
                <button className="btn" onClick={handleNextDayClick}>Next</button>
              </div>
            
              <div className="Calendar">
                <>

                <div className="Week">
                    {weekDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="Days">
                            <p>{day.toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                
                <div className="Week">
                    {weekDays.map((day, dayIndex) => (
                      
                      <div key={dayIndex} className="Tasks">
                        {tasks.map((task, taskIndex) => {
                          const taskDate = new Date(task.startDate).getDate();
                          if (taskDate === new Date(day).getDate() && 
                                new Date(day).getMonth() == new Date(task.startDate).getMonth() && 
                                new Date(day).getFullYear() == new Date(task.startDate).getFullYear()) {
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
              </div>
            
            </>
          )}
        </div>
      );
}