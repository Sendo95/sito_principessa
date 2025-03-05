import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { WorksPage } from './components/works-page';
import { WorkDetail } from './components/work-detail';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:id" element={<WorkDetail />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App