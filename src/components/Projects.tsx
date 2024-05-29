import useIsMobile from '@/hooks/useIsMobile'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  LinkIcon,
} from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface projectsProps {
  projects: {
    site: string
    description: string
    imagePath: string
    _id: string
    finishedAt: string
    projectTitle: string
    hint: string
    _createdAt: string
    _rev: string
    _type: string
    source: string
    _updatedAt: string
  }[]
}

const Projects = ({ projects }: projectsProps) => {
  const [selectedProject, setSelectedProject] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleForwardScroll = () => {
    if (selectedProject === projects.length) {
      setSelectedProject(selectedProject)
    } else {
      setSelectedProject(selectedProject + 1)
    }
  }

  const handleBackwardScroll = () => {
    if (selectedProject === 0) {
      setSelectedProject(selectedProject)
    } else {
      setSelectedProject(selectedProject - 1)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: selectedProject * window.innerWidth,
        behavior: 'smooth',
      })
    }
  }, [selectedProject])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative z-0 flex flex-col items-center h-screen max-w-full mx-auto overflow-hidden text-left md:flex-row justify-evenly'
    >
      <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
        Projects
      </h3>

      <div
        ref={scrollRef}
        className='relative w-full flex overflow-x-scroll md:overflow-hidden overflow-y-hidden items-center
      snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80'
      >
        {projects
          .sort((a, b) => {
            // If a project doesn't have a finishedAt date, treat it as being in the future
            // sorting it into the oldes comes first
            const aDate = a.finishedAt
              ? new Date(a.finishedAt).getTime()
              : Infinity
            const bDate = b.finishedAt
              ? new Date(b.finishedAt).getTime()
              : Infinity
            return aDate - bDate
          })
          .map((project, index) => (
            <div
              className={`w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-44 h-screen
            `}
              key={index}
            >
              <motion.img
                initial={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                src={project.imagePath}
                alt='Project image'
                className='object-cover w-1/2 md:w-56 '
              />
              <div className='max-w-6xl px-0 space-y-2 text-center md:space-y-10 md:px-10'>
                <h4 className='text-3xl font-semibold md:text-4xl'>
                  <span className='underline  decoration-[#FCA311]/80'>
                    Case Study {index + 1} of {projects.length}:
                  </span>{' '}
                  {project.projectTitle}
                </h4>
                <p className='max-w-2xl text-lg md:text-lg '>
                  {isMobile ? project.hint : project.description}
                </p>
                <div className='flex items-center justify-center gap-x-2'>
                  <div
                    className={`${project.finishedAt ? 'bg-blue-500' : 'bg-green-500'} w-4 h-4  rounded-full`}
                  />
                  <p className='font-semibold'>
                    {project.finishedAt
                      ? `Finished at: ${new Date(project.finishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`
                      : 'In development'}
                  </p>
                </div>
              </div>
              <div className='flex space-x-10'>
                <Link
                  href={project.source}
                  className='flex items-center rounded-full border border-[#FCA311] px-4 py-1 space-x-2 hover:bg-[#FCA311]/30 w-32 justify-center transition-all'
                >
                  <CodeBracketIcon className='w-6 md:w-8' />
                  <p className='text-lg md:text-xl'>Source</p>
                </Link>
                <Link
                  href={project.site}
                  className='flex items-center rounded-full border border-[#FCA311] w-32 justify-center space-x-2 hover:bg-[#FCA311]/30 transition-all'
                >
                  <LinkIcon className='w-5 md:w-7' />
                  <p className='text-lg md:text-xl'>Site</p>
                </Link>
              </div>
              {!isMobile && (
                <div className='flex space-x-8'>
                  {selectedProject !== 0 ? (
                    <button
                      className='p-2 transition-all rounded-full group bg-white/50 group-hover:bg-white/60'
                      onClick={handleBackwardScroll}
                    >
                      <ChevronLeftIcon className='w-8 group-hover:text-[#FCA311] transition-all' />
                    </button>
                  ) : null}

                  {selectedProject !== projects.length - 1 ? (
                    <button
                      className='p-2 transition-all rounded-full bg-white/50 group group-hover:bg-white/60 '
                      onClick={handleForwardScroll}
                    >
                      <ChevronRightIcon className='w-8 transition-all group-hover:text-[#FCA311]' />
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          ))}
      </div>

      <div className='w-full absolute top-[30%] bg-[#FCA311]/30 left-0 h-[500px] -skew-y-12' />
    </motion.div>
  )
}
export default Projects

