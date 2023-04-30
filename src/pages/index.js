import SkillsMenu from '@/components/skillsMenu'
import {getTasks} from "../../functionality/get-tasks";

export default function Home() {
  const skills = ['Math', 'Reading', 'Writing', 'Programming'];

  const handleGetTasks = () => {
    getTasks("generate huffman tree", "Research the huffman algorithm and using the started code provided fill out all of the functions that we provided", function (result) {
      console.log(result)
    })
  }

  return (
    <div>
      <button onClick={handleGetTasks}>send</button>
    </div>
  )
}
