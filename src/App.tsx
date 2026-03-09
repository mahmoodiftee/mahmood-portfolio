// import { Suspense, lazy } from 'react'
import { useState } from 'react'
import MainLayout from './layout/MainLayout'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'
import PageReveal from './components/PageReveal'

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {!revealed && <PageReveal onDone={() => setRevealed(true)} />}
      <MainLayout>
        <Hero />
        <Projects />
        <Stack />
        <Experience />
        <About />
        <Contact />
      </MainLayout>
    </>
  )
}

export default App
