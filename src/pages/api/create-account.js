// create-account.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';
const workflow = new EventEmitter();

export default function create_account(req, res) {
    const email = req.body.email
    const password = req.body.password

    workflow.once("checkParams", () => {
        if ( email && password ) {
            workflow.emit("createEmailWithPassword")
        }
        else { workflow.emit("error") }
    })

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
        .then(user => {
            workflow.emit("createToken", userId)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("createToken", (userId) => {
        addDoc(collection(db, "tokens"), { userId, expiryTime: Math.floor(+new Date / 1000) + 60*60*2 })
        .then(token => {
            workflow.emit("success", userId, token.id)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (userId, tokenId) => {
        return res.status(200).json({ userId, tokenId }) 
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("checkParams")
}