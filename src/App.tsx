// import { Suspense, lazy } from 'react'
import MainLayout from './layout/MainLayout'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'
// Example of future lazy-loaded sections
// const FutureSection = lazy(() => new Promise<{ default: React.ComponentType }>(resolve => {
//   // Simulated delay or actual import
//   // resolve(import('./sections/FutureSection'))
//   setTimeout(() => resolve({ default: () => <div className="h-screen flex items-center justify-center bg-neo-green neo-border m-12 text-4xl font-black uppercase">Coming Soon</div> }), 2000)
// }))

function App() {
  return (
    <MainLayout>
      <Hero />
      <Projects />
      <Stack />
      <Experience />
      <About />
      <Contact />
    </MainLayout>
  )
}

export default App
