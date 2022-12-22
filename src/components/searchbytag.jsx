import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Select from "react-select";
import React from "react";

const tagChoices = [
  { label: "Unreal Engine", value: "unreal" },
  { label: "Unity", value: "unity" },
  { label: "Godot", value: "godot" },
  { label: "Game Maker", value: "game maker" },
  { label: "CryEngine", value: "cryengine" },
  { label: "C", value: "c" },
  { label: "C++", value: "c++" },
  { label: "C#", value: "c#" },
  { label: "Javascript", value: "javascript" },
  { label: "Java", value: "Java" },
  { label: "HTML5", value: "html5" },
  { label: "Python", value: "python" },
  { label: "Unreal Script", value: "unrealscript" },
  { label: "Lua", value: "lua" },
  { label: "GameMaker Language", value: "gml" },
  { label: "Swift", value: "swift" },
];

function SearchByTag(props) {
  const [searchTags, setSearchTags] = useState([]);

  const updateTechState = (e) => {
    let valueArr = [];
    e.forEach((item, index) => {
      valueArr.push(item.value);
    });
    setSearchTags({
      valueArr,
    });
    props.search(valueArr);
  };

  return (
    <>
      <div style={{ display: "flex",justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
        <label>search by Tech Used</label>
        <div style={{ width: "590px", display: "flex",justifyContent:"center" }}>
          <Select
            className="multiSelect"
            options={tagChoices}
            isMulti
            onChange={updateTechState}
          />
        </div>
      </div>
    </>
  );
}

export default SearchByTag;
