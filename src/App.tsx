
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Contact from './sections/Contact';

function App() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <Hero />
        <Services />
        <Projects />
        <Contact />
        <Footer />
        
      </div>
    </main>
  );
}

export default App;