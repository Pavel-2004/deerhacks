import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function create_user(req, res) {
    const email = req.body.email
    const password = req.body.password

    console.log(email)

    workflow.once("createEmailWithPassword", () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(user => {
            workflow.emit("createDbUser", user.user.uid)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("createDbUser", () => {
        addDoc(collection(db, "students"), { email: email, sections: [], skills: [] })
        .then(user => {
            workflow.emit("success", user.user.uid)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (userId) => {
        return res.status(200).json({userId})
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("createEmailWithPassword")
}