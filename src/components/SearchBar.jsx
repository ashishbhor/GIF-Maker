import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/Features/searchSlice";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispath = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispath(setQuery(text));
    setText("");
  };
  return (
    <div className="flex justify-between items-center">
      <form
        onSubmit={submitHandler}
        className="flex bg-white gap-5 py-10 px-10 "
      >
        <input
          required
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-1/2 border-2 px-6 py-3 text-xl rounded outline-none text-black border-black"
          type="text"
          placeholder="search"
        />
        <button className="border-2 px-6 py-3 text-xl rounded active:scale-90 text-black border-black">
          Search
        </button>
      </form>
      <div className="flex text-xl items-center gap-5">
        <Link
          className="text-lg rounded px-4 text-black bg-amber-700 py-3"
          to="/"
        >
          Search
        </Link>
        <Link
          className="text-lg rounded px-4 text-black bg-amber-700 py-3"
          to="/collection"
        >
          Collection
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
