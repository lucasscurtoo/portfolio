import React from 'react'
import { motion } from 'framer-motion'

interface SkillItemProps {
  imagePath: string
  level: string
}

const SkillItem = ({ imagePath, level }: SkillItemProps) => {
  return (
    <div className='relative flex cursor-pointer group'>
      <motion.img
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className='object-contain w-20 h-20 transition duration-300 ease-in-out border border-gray-400 rounded-full xl:w-32 xl:h-32 filter group-hover:blur-sm'
        src={imagePath}
      />
      <div className='absolute z-0 w-20 h-20 duration-300 ease-in-out rounded-full opacity-0 group-hover:opacity-80 trasnition group-hover:bg-black/50 xl:w-32 xl:h-32'>
        <div className='flex items-center justify-center h-full text-center'>
          <p className='w-full px-1 text-xs font-bold text-white capitalize opacity-100 lg:text-xl'>
            {level}
          </p>
        </div>
      </div>
    </div>
  )
}
export default SkillItem

