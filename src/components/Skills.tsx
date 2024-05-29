import { motion } from 'framer-motion'
import SkillItem from './SkillItem'

type skillsType = {
  level: string
  imagePath: string
  _createdAt: string
  skill: string
  _rev: string
  _type: string
  _id: string
  _updatedAt: string
}

const Skills = ({ skills }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className=' flex  text-center overflow-hidden flex-col gap-y-4 max-w-[2000px] xl:px-10 min-h-screen justify-center mx-auto items-center'
    >
      <div className='space-y-1 text-center'>
        <h3 className='uppercase tracking-[20px] text-gray-500 text-2xl'>
          Skills
        </h3>
        <h3 className='uppercase tracking-[3px] text-gray-500 md:text-sm text-xs'>
          Hover over a skills for current level
        </h3>
      </div>
      <div className='flex flex-col items-center p-2'>
        <div className='grid justify-center grid-cols-4 gap-5'>
          {skills.map((skill: skillsType) => (
            <SkillItem
              key={skill.skill}
              imagePath={skill.imagePath}
              level={skill.level}
            />
          ))}
        </div>
      </div>
      <div className='w-4/5 space-y-2 text-sm text-center text-gray-500'>
        <p>
          &quot;When you are passionate about what you do, when you love
          learning, time disappears.&quot;
        </p>
        <p>Jacqueline Novogratz.</p>
      </div>
    </motion.div>
  )
}
export default Skills

