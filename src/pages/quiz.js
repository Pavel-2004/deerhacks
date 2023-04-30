import {useState, useEffect} from "react";
import SkillsMenu from "@/components/skillsMenu";

export default function Quiz() {
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const userIdLocal = localStorage.getItem("userId")
    if (userIdLocal) {
      setUserId(userIdLocal)
    }
    else {
      window.location.href = "/login"
    }
  }, [])

  const handleSetSkills = (skills) => {
    fetch("/api/set-skills", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        userId,
        skills
      })
    })
  }

  return (
    <div className={"min-h-screen"}>
      <SkillsMenu
        sendSkills={handleSetSkills}
        skills={[
        "math",
        "language",
        "research",
        "english",
        "writing",
        "science"
      ]}/>
    </div>
  )
}