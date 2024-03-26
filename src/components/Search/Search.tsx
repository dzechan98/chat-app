import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchProps {
  hiddenIcon?: boolean;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ hiddenIcon = false, placeholder }) => {
  return (
    <div className="w-full flex items-center gap-4 bg-light-400 rounded-md p-3 my-6">
      {!hiddenIcon && (
        <span>
          <CiSearch className="text-xl cursor-pointer" />
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default Search;
