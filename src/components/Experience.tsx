import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'

interface experienceProps {
  experiences: [
    {
      enterpriseName: string
      _type: string
      techs: [
        {
          _id: string
          skill: string
          imagePath: string
        },
      ]
      endedAt: string
      _id: string
      position: string
      _updatedAt: string
      deployedSites: [
        {
          hint: string
          _key: string
          url: string
        },
      ]
      imagePath: string
      _rev: string
      startedAt: string
      _createdAt: string
      tasks: string[]
    },
  ]
}

const Experience = ({ experiences }: experienceProps) => {
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
      className='flex flex-col items-center justify-center h-screen max-w-full px-10 mx-auto space-y-8 overflow-hidden lg:space-y-16'
    >
      <h3 className='uppercase tracking-[20px] text-gray-500 text-2xl'>
        Experience
      </h3>
      <div
        className='w-full flex space-x-5 overflow-x-scroll lg:overflow-visible  mt-8
      snap-x snap-mandatory scrollbar-none p-1 md:justify-center
       scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80'
      >
        {experiences.map((experienceCard, indx) => (
          <ExperienceCard
            key={indx}
            imageSrc={experienceCard.imagePath}
            position={experienceCard.position}
            companyName={experienceCard.enterpriseName}
            techsUsed={experienceCard.techs}
            startedAt={experienceCard.startedAt}
            endedAt={experienceCard.endedAt}
            tasks={experienceCard.tasks}
            deployedSites={experienceCard.deployedSites}
          />
        ))}
      </div>
    </motion.div>
  )
}
export default Experience

