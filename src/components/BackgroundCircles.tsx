import React from "react"
import { motion } from "framer-motion"

type Props = {}

const BackgroundCircles = ({}: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 3, 4, 5, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 1.2,
      }}
      className="relative flex justify-center items-center"
    >
      <hr
        className="absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-96 md:mt-52 
      animate-ping"
      />
      <div
        className="absolute border border-[#333333] rounded-full h-[300px] w-[300px] mt-96 md:mt-52 
      animate-ping"
      />
      <div
        className="absolute border border-[#333333] rounded-full h-[500px] w-[500px] mt-96 md:mt-52 
      animate-ping"
      />
      <div
        className="absolute border border-[#F7AB0A]/20 rounded-full h-[650px] w-[650px] mt-96 md:mt-52 
      animate-pulse"
      />
      <div
        className="absolute border border-[#333333] rounded-full h-[800px] w-[800px] mt-96 md:mt-52 
      animate-ping"
      />
    </motion.div>
  )
}
export default BackgroundCircles
