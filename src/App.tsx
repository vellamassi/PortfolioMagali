import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import ProjectCategory from './pages/ProjectCategory'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <main>
          <div className="grid">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/:type" element={<ProjectCategory />} />
                  <Route path="/:type/:slug" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
      </main>

      <footer className="footer">
        <Navigation />
      </footer>
    </>
  )
}
