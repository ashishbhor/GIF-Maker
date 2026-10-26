import ResultGride from "../components/ResultGride";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import TopText from "../components/TopText";

const HomePage = () => {
  return (
    <div>
      <TopText />
      <SearchBar />
      <Tabs />
      <ResultGride />
    </div>
  );
};

export default HomePage;
