import Hero from './sections/Hero';
import Services from './sections/Services';

function App() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <Hero />
        <Services />
      </div>
    </main>
  );
}

export default App;