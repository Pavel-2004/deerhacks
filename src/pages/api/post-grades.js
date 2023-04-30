// post-grade.js
import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 
import { db } from "../../../firebase";
import EventEmitter from 'events';

const workflow = new EventEmitter();

function convertToInteger(value) {
    if (Number.isInteger(value)) {
      // if value is already an integer, return it as is
      return value;
    } else if (typeof value === 'string') {
      // if value is a string, try to parse it as an integer
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && Number.isInteger(parsedValue)) {
        return parsedValue;
      }
    } else if (typeof value === 'number') {
      // if value is a number with decimal places, round it down to the nearest integer
      if (Math.floor(value) === value) {
        return value;
      } else {
        return Math.floor(value);
      }
    }
    // if value cannot be converted to an integer, return undefined
    return undefined;
  } //continue in next message

export default function create_account(req, res) {
    const assignmentId = req.body.assignmentId
    const description = req.body.description
    const intermediaryGrade = req.body.grade
    const grade = convertToInteger(intermediaryGrade)
    const studentId = req.body.studentId
    
    workflow.once("checkParams", () => {
        if ( assignmentId && description && grade && studentId ) {
            workflow.emit("findAssignment")
        }
        else {
            workflow.emit("error", "bad params")
        }
    })
    
    workflow.once("findAssignment", () => {
        getDoc(doc(db, "assignments", assignmentId))
        .then(assignmentRef => {
            if (assignmentRef.exists()){
                workflow.emit("postGrade", assignmentRef.get("section"))
            }
            else {
                workflow.emit("error", "assignment ID not found")
            }             
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("postGrade", (sectionId) => {
        addDoc(collection(db, "grades"), { assignmentId, description, grade, sectionId, studentId })
        .then(grade => {
            workflow.emit("success", grade.id)
        })  
        .catch(err => {
            workflow.emit("error", err.message)
        })
    })

    workflow.once("success", (gradeId) => {
        return res.status(200).json({ gradeId }) //isn't studentId the same ID as userID?
    })

    workflow.once("error", (message) => {
        return res.status(200).json({message})
    })

    workflow.emit("checkParams")
}