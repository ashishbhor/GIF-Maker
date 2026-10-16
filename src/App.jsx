import ResultGride from "./components/ResultGride"
import SearchBar from "./components/SearchBar"
import Tabs from "./components/Tabs"



function App() {
  return (
    <div className="bg-gray-950 w-full h-screen text-white">
      <SearchBar />
      <Tabs />
      <ResultGride/>
    </div>
  )
}

export default App