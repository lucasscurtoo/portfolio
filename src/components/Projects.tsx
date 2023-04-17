import useIsMobile from "@/hooks/useIsMobile"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  LinkIcon,
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { projects } from "../../constants"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  console.log(isMobile)

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
        behavior: "smooth",
      })
    }
    console.log(selectedProject)
  }, [selectedProject])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div
        ref={scrollRef}
        className="relative w-full flex overflow-x-scroll md:overflow-hidden overflow-y-hidden items-center 
      snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80"
      >
        {projects.map((project, index) => (
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
              src={project.src}
              alt="Project image"
              className="w-1/2 md:w-56 object-cover"
            />
            <div className="space-y-2 md:space-y-10 px-0 md:px-10 max-w-6xl text-center">
              <h4 className="text-3xl md:text-4xl font-semibold">
                <span className="underline  decoration-[#FCA311]/80">
                  Case Study {index + 1} of {projects.length}:
                </span>{" "}
                {project.title}
              </h4>
              <p className="text-lg md:text-lg md:text-left h-52 overflow-scroll">
                {isMobile ? project.hint : project.description}
              </p>
            </div>
            <div className="flex space-x-10">
              <Link
                href={project.sourceCode}
                className="flex items-center rounded-full border border-[#FCA311] px-4 py-1 space-x-2 hover:bg-[#FCA311]/30 w-32 justify-center"
              >
                <CodeBracketIcon className="w-6 md:w-8" />
                <p className="text-lg md:text-xl">Source</p>
              </Link>
              <Link
                href={project.deployedApp}
                className="flex items-center rounded-full border border-[#FCA311] w-32 justify-center space-x-2 hover:bg-[#FCA311]/30"
              >
                <LinkIcon className="w-5 md:w-7" />
                <p className="text-lg md:text-xl">Site</p>
              </Link>
            </div>
            {!isMobile && (
              <div className="space-x-8 flex">
                {selectedProject !== 0 ? (
                  <button
                    className="rounded-full bg-white/50 hover:bg-white/60 p-2"
                    onClick={handleBackwardScroll}
                  >
                    <ChevronLeftIcon className="w-8 hover:text-[#FCA311]" />
                  </button>
                ) : null}

                {selectedProject !== projects.length - 1 ? (
                  <button
                    className="rounded-full bg-white/50 hover:bg-white/60 p-2 "
                    onClick={handleForwardScroll}
                  >
                    <ChevronRightIcon className="w-8 hover:text-[#FCA311]" />
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#FCA311]/30 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  )
}
export default Projects
