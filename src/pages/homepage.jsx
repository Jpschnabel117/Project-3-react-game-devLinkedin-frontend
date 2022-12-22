import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ProjectCard from "../components/projectcard";
import SearchProjects from "../components/searchprojects";
import SearchByTag from "../components/searchbytag";

const Homepage = () => {
  const [projectsArr, setProjectsArr] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState(projectsArr);
  const [showTech, setShowTech] = useState(false);

  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  function getProjectsList() {
    console.log("runs");
    axios
      .get("http://localhost:3001/api/projects")
      .then((axiosResponse) => {
        console.log("resolves");
        console.log(axiosResponse.data);
        setProjectsArr(axiosResponse.data);
      })
      .catch((err) => console.log(err));
    console.log("hello from use effect");
  }
  const searchList = (term) => {
    const searchedList = projectsArr.filter((element) => {
      let searchedtitle = element.title
        .toLowerCase()
        .includes(term.toLowerCase());
      return searchedtitle;
    });
    setSearchedProjects(searchedList);
  };

  const tagSearch = (tags) => {
    const taggedList = projectsArr.filter((element) => {
      let pass = false;
      tags.forEach((searchtag) => {
        if (
          element.tech.languages.includes(searchtag) ||
          element.tech.engines.includes(searchtag)
        ) {
          pass = true;
        } else {
          pass = false; 
        }
      });
      return pass;
    });
    setSearchedProjects(taggedList);
  };

  useEffect(() => {
    getProjectsList();
  }, [searchedProjects]);

  return (
    <>
      {showTech ? (
        <>
          <button onClick={() => setShowTech(false)}>
            Swap to Title Search
          </button>
          <SearchByTag search={tagSearch} />
        </>
      ) : (
        <>
          <button onClick={() => setShowTech(true)}>Swap to Tag Search</button>
          <SearchProjects search={searchList} />
        </>
      )}
      <main className="projectListPage">
        {searchedProjects.map((singleProject) => {
          return <ProjectCard singleProject={singleProject} />;
        })}
      </main>
    </>
  );
};

export default Homepage;
