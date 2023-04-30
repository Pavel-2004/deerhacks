import {getDocs, collection, query} from "firebase/firestore"
import {db, auth} from "../../../firebase";

export default function handler(req, res) {
  const q = query(collection(db, "students"))
  getDocs(q)
    .then(studentsObj => {
      const newStudents = []
      studentsObj.forEach(studentObj => {
        newStudents.push({...studentObj.data(), sectionId: studentObj.id})
      })
      res.status(200).json({students: newStudents})
    })
}
