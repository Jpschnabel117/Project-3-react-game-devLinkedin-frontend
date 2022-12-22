import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

function SearchProjects(props) {
  const [searchTerm, setSearchTerm] = useState("");



  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label>Search: </label>
      <input
        className="searchInput"
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          props.search(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchProjects;
