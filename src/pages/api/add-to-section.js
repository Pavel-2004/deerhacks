// add-to-section.js
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function add_to_section(req, res) {
    const section = req.body.sectionId
    const student = req.body.studentId
    const studentRef = doc(db, "students", student);

    workflow.once("addSection", () => {
        updateDoc(studentRef, { sections: arrayUnion(section) })
        .then(studentDoc => { 
            workflow.emit("success", studentDoc) 
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

    workflow.emit("addSection")
}