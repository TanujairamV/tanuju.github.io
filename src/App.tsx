import { Routes, Route } from 'react-router-dom';
import GlassCursor from './components/GlassCursor';
import SpotifyWidget from './components/SpotifyWidget';
import DynamicIsland from './components/DynamicIsland';
import Header from './components/Navbar';
import Home from './pages/Home';
import Fun from './pages/Fun';
import Certificates from './pages/Certificates';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import ProjectsPage from './pages/ProjectsPage';
import './App.css';

function App() {
  return (
    <>
      <GlassCursor />
      <Header />
      <DynamicIsland />
      <SpotifyWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun" element={<Fun />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}

export default App;
