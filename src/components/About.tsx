import { motion } from "framer-motion"

const About = () => {
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
      className="flex flex-col relative h-screen text-center 
  md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1.5,
        }}
        viewport={{ once: true }}
        src="/dev.webp"
        className="-mb-20 md:mb-0 flex-shrink-0 mt-12 sm:mt-0 w-56 h-56 rounded-full object-cover md:w-65 md:h-65 xl:w-[500px] xl:h-[500px] z-10"
      />
      <div className="space-y-5 md:space-x-y px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Get a{" "}
          <span className="underline underline-offset-4 decoration-[#FCA311]/50">
            look
          </span>{" "}
          about me
        </h4>
        <p className="text-base">
          I am a self-taught full stack developer with a keen interest in
          cybersecurity and UX/UI design. I possess excellent teamwork skills
          and have a great ability to work collaboratively. I am always eager to
          learn and have been currently focusing on mastering the MERN stack,
          which I am applying in a personal project. My passion for developing
          innovative solutions drives me to stay up-to-date with the latest
          technologies and constantly improve my skills.
        </p>
      </div>
      <div className="w-screen absolute top-[30%] bg-[#FCA311]/30 h-[500px] -skew-y-12 z-0" />
    </motion.div>
  )
}
export default About
