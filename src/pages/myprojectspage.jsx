import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ProjectCard from "../components/projectcard";

const MyProjectsPage = () => {
  const [projectsArr, setProjectsArr] = useState([]);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  const getProjectsList = () => {
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
  };

  // const deleteIt = (projectid) => {
  //   axios
  //     .delete(`http://localhost:3001/api/projects/${projectid}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((axiosResponse) => {
  //       console.log(axiosResponse.data);
  //       getProjectsList();
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <>
      <h1>My Projects</h1>
      <main className="projectListPage">
        {/* add search bar here */}

        {
          /* {user && */
          projectsArr.map((singleProject) => {
            if (singleProject.owner._id === user._id) {
              return <ProjectCard singleProject={singleProject} />;
            } else {
              return "";
            }
          })
        }
      </main>
      <Link to={"/submitproject"}>
        <button>Submit new Project</button>
      </Link>
    </>
  );
};

export default MyProjectsPage;
