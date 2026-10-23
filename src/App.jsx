import ResultGride from "./components/ResultGride"
import SearchBar from "./components/SearchBar"
import Tabs from "./components/Tabs"



function App() {
  return (
    <div className="bg-white w-full min-h-screen text-white">
      <SearchBar />
      <Tabs />
      <ResultGride />
    </div>
  )
}

export default App