import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ColleactionPage from "./pages/ColleactionPage";
import TopText from "./components/TopText";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import CreditsPage from "./pages/CreditsPage";

function App() {
  return (
    <div className="w-full min-h-screen text-white">
      <TopText />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<ColleactionPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/credits" element={<CreditsPage />} />
      </Routes>
    </div>
  );
}

export default App;
