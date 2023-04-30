// add-to-section.js
import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function add_to_section(req, res) {
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

    workflow.once("findUser", () => {
        getDoc(doc(db, "students", student))
        .then(studentRef => {
            if (studentRef.exists()){
                workflow.emit("addToSection", studentRef.id)
            }
            else {
                workflow.emit("error", "Id not found")
            }             
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })
    
    workflow.once("addToSection", (studentId) => {
        updateDoc(doc(db, "students", studentId), { sections: arrayUnion(section) })
        .then(studentId => { 
            workflow.emit("success", studentId) 
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (studentId) => {
        return res.status(200).json({studentId})
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("checkParams")
}