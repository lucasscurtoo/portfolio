import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { SubmitHandler, useForm } from 'react-hook-form'
type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

const ContactMe = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    console.log(formData)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Email sent successfully!')
        reset()
      } else {
        alert('Failed to send email: ' + result.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while sending the email.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen px-10 mx-auto overflow-hidden text-center lg:justify-evenly md:text-left gap-y-2'>
      <h3 className='uppercase tracking-[20px] text-gray-500 text-2xl'>
        Contact Me
      </h3>
      <div className='flex flex-col md:space-y-10 '>
        <h4 className='text-4xl font-semibold text-center'>
          I have got just what you need.{' '}
          <span className='underline underline-offset-4 decoration-[#FCA311]/80'>
            Lets Talk
          </span>
        </h4>
        <div className='my-5 space-y-2 md:space-y-10'>
          <div className='flex items-center justify-center space-x-5'>
            <PhoneIcon className='w-4 text-yellow-600 md:w-7 animate-pulse' />
            <p className='text-base text-gray-400 md:text-2xl md:text-white'>
              +598 91 886 037
            </p>
          </div>
          <div className='flex items-center justify-center space-x-5'>
            <MapPinIcon className='w-4 text-yellow-600 md:w-7 animate-pulse' />
            <p className='text-base text-gray-400 md:text-2xl md:text-white'>
              Montevideo, Uruguay
            </p>
          </div>
          <div className='flex items-center justify-center space-x-5'>
            <EnvelopeIcon className='w-4 text-yellow-600 md:w-7 animate-pulse' />
            <p className='text-base text-gray-400 md:text-2xl md:text-white'>
              lucascurtoo@gmail.com
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-2 md:w-fit md:mx-auto'
        >
          <div className='flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row'>
            <input
              {...register('name')}
              placeholder='Name'
              className='contactInput'
              type='text'
            />
            <input
              {...register('email')}
              placeholder='Email'
              className='contactInput'
              type='email'
            />
          </div>
          <input
            {...register('subject')}
            placeholder='Subject'
            className='contactInput'
            type='text'
          />
          <textarea
            {...register('message')}
            placeholder='Message'
            className='contactInput'
          />
          <button
            type='submit'
            className='bg-[#FCA311]   py-5 px-10 rounded-md text-black font-bold text-lg'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default ContactMe

