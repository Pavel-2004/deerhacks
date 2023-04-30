// create-section.js
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../firebase";
import EventEmitter from 'events';

const workflow = new EventEmitter();

export default function create_section(req, res) {
    const description = req.body.description
    const name = req.body.name

    workflow.once("checkParams", () => {
        if ( description && name ) {
            workflow.emit("createSection")
        }
        else { workflow.emit("error") }
    })

    workflow.once("createSection", () => {
        addDoc(collection(db, "sections"), { description, name })
        .then(section => {
            workflow.emit("success", section.id)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (sectionId) => {
        return res.status(200).json({sectionId})
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("checkParams")
}