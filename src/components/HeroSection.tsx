import Image from "next/image"
import Link from "next/link"
import { Cursor, useTypewriter } from "react-simple-typewriter"
import BackgroundCircles from "./BackgroundCircles"
type Props = {}

const HeroSection = ({}: Props) => {
  const [text] = useTypewriter({
    words: [
      "Hi, the name's Lucas Curto",
      "GuyWhoLovesCoffe.tsx",
      "drinks_a_lot_of_mate.py",
      "EatsTooMuchPizza.rb",
      "<AndLovesToCodeMuchMore />",
    ],
    loop: true,
    delaySpeed: 2000,
  })
  return (
    <div
      className="h-screen flex flex-col space-y-8 items-center justify-center text-center
     overflow-hidden"
    >
      <BackgroundCircles />
      <Image
        src="/myPhoto.webp"
        alt="Portfolio foto"
        width={100}
        height={100}
        className="rounded-full object-cover"
      />
      <div className="z-20 w-full">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Fullstack Developer
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10 break-words">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#FCA311" />
        </h1>
        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default HeroSection
