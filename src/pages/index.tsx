import About from "@/components/About"
import ContactMe from "@/components/ContactMe"
import Experience from "@/components/Experience"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"

export default function Home() {
  return (
    <main
      className="bg-[rgb(36,36,36)] text-white  h-screen snap-y snap-mandatory 
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#FCA311]/80"
    >
      <Header />
      <section id="hero" className="snap-start">
        <HeroSection />
      </section>
      <section id="about" className="snap-center">
        <About />
      </section>
      <section id="experience" className="snap-center">
        <Experience />
      </section>
      <section id="skills" className="snap-start">
        <Skills />
      </section>
      <section id="projects" className="snap-start">
        <Projects />
      </section>
      <section id="contactMe" className="snap-center">
        <ContactMe />
      </section>
    </main>
  )
}
