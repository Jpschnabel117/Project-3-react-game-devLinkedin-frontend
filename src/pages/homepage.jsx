import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Homepage = () => {
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
      <h1>This is the home page</h1>
      <main className="projectListPage">
        {/* add search bar here */}

        {
          /* {user && */
          projectsArr.map((singleProject) => {
            return (
              <>
                <div className="game-card">
                  <Link to={`/projects/${singleProject._id}`}>
                    <img src="/public/vite.svg" alt="" />
                  </Link>
                  <div className="game-card-bottom">
                    <Link to={`/projects/${singleProject._id}`}>
                      <h2>{singleProject.title}</h2>
                    </Link>
                    <p>{singleProject.description.short}</p>
                    <Link>
                      <button></button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })
        }
      </main>
    </>
  );
};

export default Homepage;
