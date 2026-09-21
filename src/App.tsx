import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { MoneyTrail } from "./components/MoneyTrail";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Education } from "./pages/Education";
import { ExperienceDetail } from "./pages/ExperienceDetail";
import { Experiences } from "./pages/Experiences";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Projects } from "./pages/Projects";
import { useEffect } from "react";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <MoneyTrail />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:slug" element={<ExperienceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/projects/research/:slug" element={<ArticleDetail />} />
          <Route path="/education" element={<Education />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
