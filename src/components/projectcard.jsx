import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const ProjectCard = (props) => {
    return (
      <>
        <div className="game-card">
          <Link to={`/projects/${props.singleProject._id}`}>
            <img className="imgcard" src="/public/vite.svg" alt="" />
          </Link>
          {/* <h1>{props.singleProject.owner.displayName}</h1> */}
          <div className="game-card-bottom">
            <Link to={`/projects/${props.singleProject._id}`}>
              <h4 style={{marginTop:"0", marginBottom:"5px"}}>{props.singleProject.title}</h4>
            </Link>
            <p style={{ height:"100px" }}>{props.singleProject.description.short}</p>
            <Link>
              <button></button>
            </Link>
          </div>
        </div>
      </>
    );
}
export default ProjectCard