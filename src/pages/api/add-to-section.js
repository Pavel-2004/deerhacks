import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function handler(req, res) {
  const section = req.body.sectionId
  const student = req.body.studentId 
  
  workflow.once("checkParams", () => {
        if (
            student
            && section
        )
        {
            workflow.emit("findUser")
        }
        else {
            workflow.emit("error", "bad params")
        }
    })
    
    workflow.once("addToSection", (studentId) => {
        updateDoc(doc(db, "students", studentId), { sections: arrayUnion(section) })
        .then(studentId => { 
            workflow.emit("success", studentId) 
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        }
        return res.status(200).json({message})
    })
    
    workflow.emit("checkParams")
}