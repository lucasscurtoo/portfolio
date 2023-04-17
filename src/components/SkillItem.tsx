import React from "react"
import { motion } from "framer-motion"

interface SkillItemProps {
  skillImage: string
  skillPercentage?: number
}

const SkillItem: React.FC<SkillItemProps> = ({
  skillImage,
  skillPercentage,
}) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-full border border-gray-400 object-contain w-20 h-20  xl:w-32 xl:h-32  filter group-hover:grayscale transition duration-300 ease-in-out"
        src={skillImage}
      />
      <div className="absolute opacity-0 group-hover:opacity-80 trasnition duration-300 ease-in-out group-hover:bg-white w-20 h-20 xl:w-32 xl:h-32 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold text-black opacity-100">
            {skillPercentage}%
          </p>
        </div>
      </div>
    </div>
  )
}
export default SkillItem
