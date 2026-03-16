import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import StatsSection from '../components/StatsSection';
import FiverrBanner from '../components/FiverrBanner';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <About />
        <TechStack />
        <StatsSection />
        <FiverrBanner />
      </main>
      <Footer />
    </>
  );
};

export default Home;
