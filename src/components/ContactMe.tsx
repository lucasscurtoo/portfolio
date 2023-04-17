import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid"
import { SubmitHandler, useForm } from "react-hook-form"
type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

type Props = {}

const ContactMe = ({}: Props) => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:lucascurtoo@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`
  }

  return (
    <div className="h-[120vh] flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden">
      <h3 className="absolute top-36 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact Me
      </h3>
      <div className="flex flex-col md:space-y-10  md:mt-0">
        <h4 className="text-4xl font-semibold text-center">
          I have got just what you need.{" "}
          <span className="underline underline-offset-4 decoration-[#FCA311]/80">
            Lets Talk
          </span>
        </h4>
        <div className="space-y-2 md:space-y-10 my-5">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-yellow-600 w-7 animate-pulse" />
            <p className="text-2xl text-gray-400 md:text-white">
              +598 91 886 037
            </p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-yellow-600 w-7 animate-pulse" />
            <p className="text-2xl text-gray-400 md:text-white">
              Montevideo, Uruguay
            </p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-yellow-600 w-7 animate-pulse" />
            <p className="text-2xl text-gray-400 md:text-white">
              lucascurtoo@gmail.com
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 md:w-fit md:mx-auto"
        >
          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-[#FCA311]   py-5 px-10 rounded-md text-black font-bold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default ContactMe
