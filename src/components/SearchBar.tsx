"use client";

import { FC, useState, FormEvent, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  dynamic?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Search Project",
  onSearch,
  dynamic = false,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (dynamic && onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch && !dynamic) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-md border border-gray-300 px-4 py-2 w-5/6 max-w-md shadow-sm"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border-none outline-none text-gray-700 text-sm"
        value={query}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <FiSearch size={18} />
      </button>
    </form>
  );
};
