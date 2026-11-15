import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DiscoveryBanner from './components/DiscoveryBanner.jsx'
import Training from './components/Training.jsx'
import Career from './components/Career.jsx'
import Consulting from './components/Consulting.jsx'
import Holistic from './components/Holistic.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DiscoveryBanner />
        <Training />
        <Career />
        <Consulting />
        <Holistic />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
