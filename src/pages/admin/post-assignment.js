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
    <div className={"w-full h-full flex-col bg-[#B5FFE1]"}>
      <div className={"flex flex-row ml-1"}>
        <p className={"text-center my-6 font-bold text-3xl text-[#00241B]"} >Assignment Creator</p>
      </div>
      <div className={"flex flex-row ml-1"}>
        <p className={"text-center mr-3 font-bold ml-3 text-[#00241B]"} >Select Section</p>
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
            <div className={"flex flex-col my-4 "}>
              <p className={"flex flex-row ml-4 font-bold mb-1 text-xl text-[#00241B]"} >Assignment Name:</p>
              <input className={"pl-4"} value={assignmentName} onChange={e => setAssignmentName(e.target.value)} placeholder={"Enter name of assignment"} />
            </div>
            <div className={"flex flex-col"}>
              <p className={"flex flex-row ml-4 font-bold mb-1 text-xl text-[#00241B]"} >Assignment Description:</p>
              <textarea className={"pl-4"} value={descripiton} onChange={e => setDescription(e.target.value)} placeholder={"Enter description of assignment"} />
            </div>
            <div className={"flex flex-row justify-start mt-4"}>
              <button className="bg-[#65B891] ml-4 mb-4 rounded-lg text-[#00241B] p-2 text-center font-bold cursor-pointer" onClick={handleGenerateTasks}>Generate</button>
            </div>
          </>
        )
      }
      {
        tasks.length !== 0 && (
          <>
            <p className={"flex flex-row ml-4 font-bold my-3 text-l text-[#00241B]"} >Select Skills per task</p>
            <>
              {
                tasks.map((task, index) => {
                  return (
                    <>
                      <p className={"ml-4 font-bold text-[#00241B] mb-1"} >{task[0]}</p>
                      {
                        skills.map((skill) => {
                          return (
                              <button className={"bg-[#65B891] ml-4 mb-4 rounded-lg text-[#00241B] p-2 text-center font-bold cursor-pointer"} onClick={() => handleAddSkill(index, skill)}>{skill}</button>
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