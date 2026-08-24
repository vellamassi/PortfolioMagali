import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import GlitchEffect from './components/visual-helpers/GlitchEffect'
import Home from './pages/Home'
import ProjectCategory from './pages/ProjectCategory'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import StaticOverlay from "./components/visual-helpers/StaticOverlay.tsx";

export default function App() {
    return (
        <>

            <GlitchEffect />

            <StaticOverlay></StaticOverlay>

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/:type" element={<ProjectCategory />} />
                    <Route path="/:type/:slug" element={<ProjectDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <footer className="footer">
                <Navigation />
            </footer>
          </>
    )
}
