import {useState, useEffect} from "react";

export default function StudentToSection() {
  const [sections, setSections] = useState([])
  const [students, setStudents] = useState([])

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


  return (
    <div>
      {
        sections.map(section => {
          return (
            <>
              <p>{section.name}</p>
              {
                students.map(student => {
                  if (!student.sections.includes(section.id)) {
                    return (
                      <div className={"flex flex-row"}>
                        <p className={"flex flex-1"}>{student.email}</p>
                        <button className={"flex"} onClick={() => handleAddStudent(section.id, student.id)}>Add</button>
                      </div>
                    )
                  }
                })
              }
            </>
          )
        })
      }
    </div>
  )
}