import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ThumbsUpButton from "./thumbsup";

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
            <h4 style={{ marginTop: "0", marginBottom: "5px" }}>
              {props.singleProject.title}
            </h4>
          </Link>
          <p style={{ height: "90px" }}>
            {props.singleProject.description.short}
          </p>
          <div style={{display: "flex", alignItems: "center", paddingLeft: "5px", paddingRight: "5px"}}>
            <div><ThumbsUpButton singleProject={props.singleProject}/></div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {props.singleProject.tech.engines.map((element) => {
                return <div className="skill-tag"> {element} </div>;
              })}
              {props.singleProject.tech.languages.map((element) => {
                return <div className="skill-tag"> {element} </div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectCard;
