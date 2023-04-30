//sign-in.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {db, auth} from "../../../firebase";
import EventEmitter from 'events';

const workflow = new EventEmitter();

export default function sign_in(req, res) {
    const email = req.body.email
    const password = req.body.password

    workflow.once("checkParams", () => {
        if ( email && password ) {
            workflow.emit("signIn")
        }
        else { workflow.emit("error") }
    })

    workflow.once("signIn", () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            workflow.emit("createToken", user.user.uid)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("createToken", (userId) => {
        addDoc(collection(db, "tokens"), { userId, expiryTime: Math.floor(+new Date / 1000) + 60*60*2 })
        .then(token => {
            workflow.emit("success", token.id)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (tokenId) => {
        return res.status(200).json({ tokenId }) 
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("checkParams")
}