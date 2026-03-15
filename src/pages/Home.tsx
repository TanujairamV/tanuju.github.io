import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import FiverrBanner from '../components/FiverrBanner';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Projects />
        <FiverrBanner />
      </main>
      <Footer />
    </>
  );
};

export default Home;
