import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ColleactionPage from "./pages/ColleactionPage";
import TopText from "./components/TopText";

function App() {
  return (
    <div className="w-full min-h-screen text-white">
      <TopText />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<ColleactionPage />} />
      </Routes>
    </div>
  );
}

export default App;
