import SkillsMenu from '@/components/skillsMenu'

export default function Home() {
  const skills = ['Math', 'Reading', 'Writing', 'Programming'];
  return (
    <div>
      <SkillsMenu skills={skills}/>
    </div>
  }
}  