import {getDocs, collection, query} from "firebase/firestore"
import {db, auth} from "../../../firebase";

export default function handler(req, res) {
  const q = query(collection(db, "sections"))
  getDocs(q)
    .then(sectionsObj => {
      const newSections = []
      sectionsObj.forEach(sectionObj => {
        newSections.push({...sectionObj.data(), sectionId: sectionObj.id})
      })
      res.status(200).json({sections: newSections})
    })
}
