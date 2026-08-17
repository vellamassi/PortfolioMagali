import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import ProjectCategory from './pages/ProjectCategory'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:type" element={<ProjectCategory />} />
          <Route path="/:type/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>

      <footer className="footer">
        <Navigation />
      </footer>
    </>
  )
}
