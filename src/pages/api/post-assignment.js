import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../firebase";
import EventEmitter from 'events';

const workflow = new EventEmitter();

export default function post_assignment(req, res) {
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function create_user(req, res) {
    const assigmentName = req.body.assigmentName
    const description = req.body.description
    const dueDate = req.body.dueDate
    const section = req.body.section

    workflow.once("checkParams", () => {
        if ( assigmentName && description && dueDate && section ) {
            workflow.emit("createAssignment")
        }
        else { workflow.emit("error") }
    })

    workflow.once("createAssignment", () => {
        addDoc(collection(db, "assignments"), { assigmentName, description, dueDate, section })
        .then(assignment => {
            workflow.emit("success", assignment.id)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (assignmentId) => {
        return res.status(200).json({assignmentId})
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })
    
    workflow.emit("checkParams")
}