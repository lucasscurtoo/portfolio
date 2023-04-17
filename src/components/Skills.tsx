import { motion } from "framer-motion"
import { techSkills } from "../../constants"
import SkillItem from "./SkillItem"

const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className=" flex relative text-center md:text-left overflow-hidden flex-col xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-28 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skills for currency porfieciency
      </h3>
      <div className="flex flex-col items-center p-2">
        <div className="grid grid-cols-4 gap-5 justify-center">
          {techSkills.map((skill) => (
            <SkillItem
              key={skill.skillName}
              skillImage={skill.skillImage}
              skillPercentage={skill.skillPercentage}
            />
          ))}
        </div>
        <p className="mt-8 w-4/5 text-gray-500 text-sm">
          &quot;When you are passionate about what you do, when you love
          learning, time disappears.&quot; <br />- Jacqueline Novogratz.
        </p>
      </div>
    </motion.div>
  )
}
export default Skills
