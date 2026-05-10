import Navbar from "@/components/Navbar";
import HeroAnimation from "@/components/HeroAnimation";
import Services from "@/components/Services";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroAnimation />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
