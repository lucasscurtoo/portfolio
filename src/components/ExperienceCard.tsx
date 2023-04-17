import React from "react"
import { motion } from "framer-motion"

interface ExperienceCardProps {
  imageSrc: string
  position: string
  companyName: string
  techUsed: { name: string; src: string }[]
  workDateTime: { startedAT: string; endedAt?: string }
  tasks: string[]
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageSrc,
  position,
  companyName,
  techUsed,
  workDateTime,
  tasks,
}) => {
  return (
    <article
      className="flex flex-col rounded-3xl items-center space-y-7 min-w-fit select-none
    snap-center bg-[#292929] py-5 hover:opacity-80 cursor-pointer transition-opacity duration-200 overflow-hidden shadow-md"
    >
      <motion.img
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        viewport={{ once: true }}
        src={imageSrc}
        className="object-cover w-48 lg:w-56"
        alt="Moove-it logo"
      />
      <div className="px-0 md:px-10 flex flex-col items-center">
        <h4 className="text-4xl font-light">{position}</h4>
        <p className="font-bold text-2xl mt-1">{companyName}</p>
        <div className="flex space-x-2 my-4 flex-wrap justify-center">
          {techUsed?.map((tech) => (
            <motion.img
              key={tech?.name}
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
              }}
              viewport={{ once: true }}
              src={tech?.src}
              className="w-10 h-10 lg:w-16 lg:h-16 object-contain rounded-full"
              alt={tech?.name}
            />
          ))}
        </div>
        <p className="pt-5 text-gray-400 text-center">
          Started working at {workDateTime?.startedAT}
        </p>
        <p className="pb-5 text-gray-400 text-center">
          {workDateTime?.endedAt
            ? `Ended at ${workDateTime?.endedAt}`
            : "Present"}
        </p>
        <ul className="space-y-2 px-2 text-lg text-center list-inside">
          <p className="text-center">Tasks: </p>
          {tasks?.map((task, indx) => (
            <li key={indx}>{task}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
export default ExperienceCard
