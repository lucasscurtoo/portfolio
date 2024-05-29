import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LinkIcon } from '@heroicons/react/24/solid'

interface ExperienceCardProps {
  imageSrc: string
  position: string
  companyName: string
  techsUsed: { skill: string; imagePath: string }[]
  startedAt: string
  endedAt?: string
  tasks: string[]
  deployedSites?: [
    {
      hint: string
      _key: string
      url: string
    },
  ]
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageSrc,
  position,
  companyName,
  techsUsed,
  startedAt,
  endedAt,
  tasks,
  deployedSites,
}) => {
  return (
    <div
      className='flex flex-col justify-between rounded-3xl items-center space-y-4 md:space-y-7  border-transparent border-[0.5px] select-none w-full min-w-80 md:min-w-96
snap-center bg-[#292929] py-5 hover:opacity-80 cursor-pointer transition-opacity duration-200 overflow-hidden shadow-md max-w-lg border-dance-animation'
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
        className='object-cover w-48 lg:w-56'
        alt='Moove-it logo'
      />
      <div className='flex flex-col items-center px-0 md:px-10'>
        <h4 className='text-4xl font-light text-center'>{position}</h4>
        <p className='mt-1 text-2xl font-bold'>{companyName}</p>
        <div className='flex flex-wrap justify-center my-4 space-x-2'>
          {techsUsed?.map((tech) => (
            <motion.img
              key={tech?.skill}
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
              src={tech?.imagePath}
              className='object-contain w-10 h-10 rounded-full lg:w-16 lg:h-16'
              alt={tech?.skill}
            />
          ))}
        </div>
        <p className='pt-5 text-center text-gray-400'>
          Started working at {startedAt}
        </p>
        <p className='pb-5 text-center text-gray-400'>
          {endedAt ? `Ended at ${endedAt}` : 'Present'}
        </p>
        <ul className='px-2 space-y-2 text-sm text-center list-inside md:text-lg'>
          <p className='text-center'>Tasks: </p>
          {tasks?.map((task, indx) => <li key={indx}>{task}</li>)}
        </ul>
      </div>
      <div className='flex items-center gap-x-2'>
        {deployedSites?.map((item) => (
          <Link
            key={item._key}
            href={item.url}
            className='flex items-center rounded-full border border-[#FCA311] px-4 py-1 space-x-2 hover:bg-[#FCA311]/30 justify-center transition-all'
          >
            <LinkIcon className='w-4 lg:w-6' />
            <p className='text-base capitalize lg:text-lg'>{item.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default ExperienceCard

