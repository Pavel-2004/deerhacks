import {useState, useEffect} from "react";

export default function StudentToSection() {
  const [sections, setSections] = useState([])
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

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

    fetch("/api/get-students", {
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
        setStudents(res.students)
      })
  }, [])

  const handleAddStudent = (sectionId, studentId) => {
    fetch("/api/add-to-section", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        sectionId, studentId
      })
        .then(() => {
          const newStudents = students
          newStudents.forEach(student, studentIndex => {
            if (student.id === studentId) {
              newStudents[studentIndex]["sections"].push(sectionId)
            }
          })
          setStudents(newStudents)
        })
    })
  }

  const handleCreateSection = () => {
    fetch("/api/create-section", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name, description
      })
    })
  }


  return (
    <div className={"justify-center bg-[#B5FFE1] p-1 pl-3"}>
      {
        sections.map(section => {
          return (
            <>
              <p className={"my-2 font-bold text-3xl text-[#00241B]"} >{section.name}</p>
              {
                students.map(student => {
                  if (!student.sections.includes(section.id)) {
                    return (
                      <div className={"flex flex-row justify-left my-1"}>
                        <p className={"flex flex-1 text-[#00241B]"}>{student.email}</p>
                        <button className={"bg-[#65B891] ml-4 rounded-lg text-[#00241B] py-1 px-2 text-center font-bold cursor-pointer"} onClick={() => handleAddStudent(section.id, student.id)}>Add</button>
                      </div>
                    )
                  }
                })
              }
            </>
          )
        })
      }
      <div className={"flex flex-row my-4"}>
        <input className={"pl-1"}value={name} onChange={e => setName(e.target.value)} placeholder={"Section Name"} />
        <button className={"bg-[#65B891] ml-4 rounded-lg text-[#00241B] p-2 text-center font-bold cursor-pointer"} onClick={handleCreateSection}>Create</button>
      </div>
    </div>
  )
}