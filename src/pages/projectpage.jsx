import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Projectpage = () => {
  // const [projectsArr, setProjectsArr] = useState([]);

  // const getProjectsList = () => {
  //   console.log("runs");
  //   axios
  //     .get("http://localhost:3001/api/projects", {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((axiosResponse) => {
  //       console.log("resolves");
  //       console.log(axiosResponse.data);
  //       setProjectsArr(axiosResponse.data);
  //     })
  //     .catch((err) => console.log(err));
  //   console.log("hello from use effect");
  // };

  // const deleteIt = (projectid) => {
  //   axios
  //     .delete(`http://localhost:3001/api/projects/${projectid}`)
  //     .then((axiosResponse) => {
  //       console.log(axiosResponse.data);
  //       //getProjectsList();
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getProjectsList();
  // }, []);

  // return (
  //   <main className="ProjectListPage">
  //     <h1>This is the Projectpage</h1>
  //     {projectsArr.map((singleProject) => {
  //       return (
  //         <div className="ProjectCard card">
  //           <Link to={`/projects/${singleProject._id}`}>
  //             <h4>{singleProject.title}</h4>
  //           </Link>
  //           <button onClick={() => deleteIt(singleProject._id)}>Delete</button>
  //         </div>
  //       );
  //     })}
  //   </main>
  // );
};

export default Projectpage;
