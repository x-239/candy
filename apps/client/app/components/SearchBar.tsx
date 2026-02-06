import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className=" relative group  hidden md:flex items-center shadow-md rounded-md ring-1 ring-pink-100 gap-2 px-2 py-1">
      <div className="bg-[#fecdd4] rounded-full p-1 border border-[#fda4b1]">
        <Search className=" w-4 h-4 text-[#9f123c]" />
      </div>
      <input
        id="search"
        placeholder="Search. . ."
        className="text-sm outline-0"
      />
      <span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2
                     bg-black text-white text-xs px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     whitespace-nowrap"
      >
        Search
      </span>
    </div>
  );
};

export default SearchBar;
