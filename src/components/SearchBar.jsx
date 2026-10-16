import { useState } from "react"
import { useDispatch } from "react-redux"
import { setQuery } from "../redux/Features/searchSlice"


const SearchBar = () => {

  const [text, setText] = useState('')
  const dispath = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispath(setQuery(text))
    setText('')
  }
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex bg-gray-700 gap-5 py-10 px-10 ">
        <input
          required
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          className="w-full border-2 px-6 py-3 text-xl rounded outline-none"
          type="text"
          placeholder='search' />
          <button  className="border-2 px-6 py-3 text-xl rounded active:scale-90">Search</button>
        </form>
    </div>
  )
}

export default SearchBar