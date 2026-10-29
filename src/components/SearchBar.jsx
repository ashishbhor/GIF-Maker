import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/Features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const cleanQuery = text.trim();

    if (!cleanQuery) return;

    dispatch(setQuery(cleanQuery));
  };

  return (
    <form
      id="visual-wall-search-form"
      onSubmit={submitHandler}
      className="mx-auto flex w-full max-w-115 items-center gap-2
        rounded-full border border-white/15 bg-white/6
        p-1.5 pl-5 shadow-lg backdrop-blur-xl
        transition-all duration-300
        focus-within:border-white/30 focus-within:bg-white/9"
    >
      <input
        id="visual-wall-search"
        type="text"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search photos, videos, GIFs..."
        aria-label="Search photos, videos, and GIFs"
        className="min-w-0 flex-1 bg-transparent py-2
          text-sm text-white placeholder:text-white/45
          outline-none"
      />

      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 items-center justify-center
          rounded-full bg-white text-black
          transition-all duration-200
          hover:scale-105 hover:bg-white/90
          active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
