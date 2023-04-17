import { SocialIcon } from "react-social-icons"
import { motion } from "framer-motion"
import Link from "next/link"
import { EnvelopeIcon } from "@heroicons/react/24/solid"

type Props = {}

const Header = ({}: Props) => {
  return (
    <header
      className="sticky top-0 flex items-start justify-between max-w-7xl
     mx-auto z-20 xl:items-center p-5 "
    >
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center"
      >
        {/* social icons */}
        <SocialIcon
          url="https://www.linkedin.com/in/lucas-curto/"
          fgColor="gray"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://github.com/lucasscurtoo"
          fgColor="gray"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://twitter.com/im_geraard"
          fgColor="gray"
          bgColor="transparent"
        />
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center text-gray-300 cursor-pointer"
      >
        <Link href="#contactMe" className="flex items-center space-x-4">
          <EnvelopeIcon className="cursor-pointer text-gray-500 w-8" />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  )
}
export default Header
