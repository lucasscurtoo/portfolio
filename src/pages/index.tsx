import About from '@/components/About'
import ContactMe from '@/components/ContactMe'
import Experience from '@/components/Experience'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import { client } from '../../sanity/lib/client'

export async function getServerSideProps() {
  const skillsQuery = '*[_type == "skills"]'
  const projectsQuery = '*[_type == "projects"]'
  const experienceQuery = `*[_type == "experience"]{
    ...,
    techs[]->{
      _id,
      skill,
      imagePath
    }
  }`

  const skills = await client.fetch(skillsQuery)
  const projects = await client.fetch(projectsQuery)
  const experience = await client.fetch(experienceQuery)
  const cv = await client.fetch(
    `*[_type == "sanity.fileAsset" && _id == "file-1f27548d8c6cf00d64a9445472baf9362225e7ee-pdf"][0]`
  )

  return {
    props: {
      skills,
      projects,
      experience,
      cv,
    },
  }
}

export default function Home({ skills, projects, experience, cv }: any) {
  return (
    <main
      className='bg-[rgb(36,36,36)] text-white  h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80'
    >
      <Header cv={cv} />
      <section id='hero' className='snap-start'>
        <HeroSection />
      </section>
      <section id='about' className='snap-center'>
        <About />
      </section>
      <section id='experience' className='snap-center'>
        <Experience experiences={experience} />
      </section>
      <section id='skills' className='snap-start'>
        <Skills skills={skills} />
      </section>
      <section id='projects' className='snap-start'>
        <Projects projects={projects} />
      </section>
      <section id='contactMe' className='snap-center'>
        <ContactMe />
      </section>
    </main>
  )
}

