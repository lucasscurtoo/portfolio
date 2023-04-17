import { motion } from "framer-motion"
import { experience } from "../../constants"
import ExperienceCard from "./ExperienceCard"

const Experience = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="h-screen flex relative overflow-hidden flex-col  md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>
      <div
        className="w-full flex space-x-5 overflow-x-scroll  mt-8
      snap-x snap-mandatory scrollbar p-1 md:justify-center
       scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80"
      >
        {experience.map((experienceCard, indx) => (
          <ExperienceCard
            key={indx}
            imageSrc={experienceCard.imageSrc}
            position={experienceCard.position}
            companyName={experienceCard.companyName}
            techUsed={experienceCard.techUsed}
            workDateTime={experienceCard.workDateTime}
            tasks={experienceCard.tasks}
          />
        ))}
      </div>
    </motion.div>
  )
}
export default Experience
