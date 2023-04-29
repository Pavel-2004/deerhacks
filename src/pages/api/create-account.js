//create-account.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function create_account(req, res) {
    const email = req.body.email
    const password = req.body.password

    workflow.once("createEmailWithPassword", () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(user => {
            workflow.emit("createDbUser", user.user.uid)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("createDbUser", (userId) => {
        addDoc(collection(db, "students"), { email: email, sections: [], skills: [] })
        .then(student => {
            workflow.emit("success", student.id, userId)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (studentId, userId) => {
        return res.status(200).json({ studentId, userId}) //isn't studentId the same ID as userID?
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("createEmailWithPassword")
}