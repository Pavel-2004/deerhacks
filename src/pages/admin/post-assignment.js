import {useState, useEffect} from "react";
import {getTasks} from "../../../functionality/get-tasks";

export default function PostAssignment() {
  const [assignmentName, setAssignmentName] = useState("")
  const [descripiton, setDescription] = useState("")

  //set this to [["task", 2, []]] when testing out other variation
  const [tasks, setTasks] = useState([])
  const [sectionId, setSectionId] = useState("")
  const [sections, setSections] = useState([])
  const skills = ["math", "reading", "research", "science", "language", "english"]

  useEffect(() => {
    fetch("/api/get-sections", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({

      })
    })
      .then(res => {
        return res.text()
      })
      .then(res => {
        return JSON.parse(res)
      })
      .then(res => {
        setSections(res.sections)
      })
  }, [])

  const handleGenerateTasks = () => {
    getTasks(assignmentName, descripiton, function(tasks) {
      const newTasks = []
      tasks.forEach(task => {
        newTasks.push([...task, []])
      })
      setTasks(newTasks)
    })
  }

  const handleAddSkill = (skill, index) => {
    const newTasks = tasks
    newTasks[index][2].push(skill)
    setTasks(newTasks)
  }

  return (
    <div className={"w-full flex-col"}>
      <div className={"flex flex-row"}>
        <p>Assignment Creator</p>
      </div>
      <div className={"flex flex-row"}>
        <p>Select Section</p>
        <select value={sectionId} onChange={e => setSectionId(e.target.value)}>
          <option>Select</option>
          {
            sections.map(section => {
              return (
                <option value={section.id}>{section.name}</option>
              )
            })
          }
        </select>
      </div>
      {
        tasks.length === 0 && (
          <>
            <div className={"flex flex-col"}>
              <p>Assignment Name:</p>
              <input value={assignmentName} onChange={e => setAssignmentName(e.target.value)} placeholder={"Enter name of assignment"} />
            </div>
            <div className={"flex flex-col"}>
              <p>Assignment Description:</p>
              <textarea value={descripiton} onChange={e => setDescription(e.target.value)} placeholder={"Enter description of assignment"} />
            </div>
            <div className={"flex flex-row justify-start"}>
              <button onClick={handleGenerateTasks}>generate</button>
            </div>
          </>
        )
      }
      {
        tasks.length !== 0 && (
          <>
            <p>Select Skills per task</p>
            <>
              {
                tasks.map((task, index) => {
                  return (
                    <>
                      <p>{task[0]}</p>
                      {
                        skills.map((skill) => {
                          return (
                              <button className={"m-1"} onClick={() => handleAddSkill(index, skill)}>{skill}</button>
                            )
                        })
                      }
                    </>
                  )
                })
              }
            </>

          </>
        )
      }
    </div>
  )
}