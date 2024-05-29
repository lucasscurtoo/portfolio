import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownCircleIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

const Header = ({ cv }: any) => {
  return (
    <header className='sticky top-0 z-20 flex items-start justify-between p-5 mx-auto max-w-7xl xl:items-center '>
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className='flex flex-row items-center'
      >
        {/* social icons */}
        <SocialIcon
          url='https://www.linkedin.com/in/lucas-curto/'
          fgColor='gray'
          bgColor='transparent'
        />
        <SocialIcon
          url='https://github.com/lucasscurtoo'
          fgColor='gray'
          bgColor='transparent'
        />
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className='flex flex-row items-center text-gray-300 cursor-pointer'
      >
        <div className='flex items-center gap-x-2'>
          <Link href='#contactMe' className='flex items-center space-x-4'>
            <EnvelopeIcon className='w-8 text-gray-500 cursor-pointer' />
            <p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
              Contact me
            </p>
          </Link>
          <div
            className='flex items-center space-x-1'
            onClick={() => window.open(cv.url)}
          >
            <ArrowDownCircleIcon className='w-8 text-gray-500 cursor-pointer' />
            <p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
              CV
            </p>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
export default Header

