import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoSearchSharp } from "react-icons/io5";

import Button from "../../UI/Button";
import { searchProducts } from "../../store/productSlice";
import { searchUsers } from "../../store/userSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch(searchUsers(query));
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleChange}
      />
      <Button type="submit">
        <IoSearchSharp />
      </Button>
    </form>
  );
}
