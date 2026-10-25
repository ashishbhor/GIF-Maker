import ResultGride from "./components/ResultGride";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import TopText from "./components/TopText";

function App() {
  return (
    <div className="bg-white w-full min-h-screen text-white">
      <TopText />
      <SearchBar />
      <Tabs />
      <ResultGride />
    </div>
  );
}

export default App;
