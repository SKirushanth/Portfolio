import Hero from './sections/Hero';
import Services from './sections/Services';

function App() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto">
        <Hero />
        {/* You can add the TrustBar here later */}
        <Services />
      </div>
    </main>
  );
}

export default App;