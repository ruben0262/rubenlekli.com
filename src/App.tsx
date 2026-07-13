import Background from './components/Background'
import SideNav from './components/SideNav'
import HeroCard from './components/HeroCard'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import References from './components/References'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="grain">
      <Background />
      <SideNav />
      <main>
        <HeroCard />
        <Marquee />
        <About />
        <Projects />
        <References />
      </main>
      <Footer />
    </div>
  )
}
