import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Select from "react-select";
import { AuthContext } from "../context/auth.context";

const engineChoices = [
  { label: "Unreal Engine", value: "unreal" },
  { label: "Unity", value: "unity" },
  { label: "Godot", value: "godot" },
  { label: "Game Maker", value: "game maker" },
  { label: "CryEngine", value: "cryengine" },
];
const languageChoices = [
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

function EditProjectPage(props) {
  const { projectId } = useParams();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: props.title,
    description: {
      short: props.descriptionShort,
      long: props.descriptionLong,
    },
    tech: {
      engines: props.techEngines,
      languages: props.techLanguages,
    },
    links: {
      github: props.linksGithub,
      steam: props.linksSteam,
      patreon: props.linksPatreon,
      discord: props.linksDiscord,
    },
    hiring: props.hiring,
  });

  const updateState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updateEnginesState = (e) => {
    let valueArr = [];
    e.forEach((item, index) => {
      valueArr.push(item.value);
    });
    setState({
      ...state,
      tech: { engines: valueArr, languages: state.tech.languages },
    });
  };

  const updateLanguagesState = (e) => {
    let valueArr = [];
    e.forEach((item, index) => {
      valueArr.push(item.value);
    });
    setState({
      ...state,
      tech: { languages: valueArr, engines: state.tech.engines },
    });
  };

  const updateDescription = (e) => {
    setState({
      ...state,
      description: {
        ...state.description,
        [e.target.name]: e.target.value,
      },
    });
  };
  const updateLinks = (e) => {
    setState({
      ...state,
      links: {
        ...state.links,
        [e.target.name]: e.target.value,
      },
    });
  };
  const deleteIt = (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/myprojects");
      })
      .catch((err) => console.log(err));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`,
        {
          title: state.title,
          description: {
            short: state.description.short,
            long: state.description.long,
          },
          tech: {
            engines: state.tech.engines,
            languages: state.tech.languages,
          },
          links: {
            github: state.links.github,
            steam: state.links.steam,
            patreon: state.links.patreon,
            discord: state.links.discord,
          },
          hiring: state.hiring,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/myprojects");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-screen">
      <form className="login-form submitform" onSubmit={onFormSubmit}>
        <h1>Edit Form</h1>
        <div className="projectform">
          <div className="pSubmitFormLeft">
            <label>Title</label>
            <input value={state.title} name="title" onChange={updateState} />
            <label>Short Description</label>
            <input
              value={state.description.short}
              name="short"
              onChange={updateDescription}
            />
            <label>Long Description</label>
            <textarea
              className="longinput"
              name="long"
              value={state.description.long}
              onChange={updateDescription}
            />
          </div>
          <div className="pSubmitFormMiddle">
            <label>Github link</label>
            <input
              value={state.links.github}
              name="github"
              onChange={updateLinks}
            />
            <label>Steam link</label>
            <input
              value={state.links.steam}
              name="steam"
              onChange={updateLinks}
            />
            <label>Patreon</label>
            <input
              value={state.links.patreon}
              name="patreon"
              onChange={updateLinks}
            />
            <label>Discord</label>
            <input
              value={state.links.discord}
              name="discord"
              onChange={updateLinks}
            />
          </div>
          <div className="pSubmitFormRight">
            <div>
              <label>Engines Used</label>
              <Select
                className="multiSelect"
                options={engineChoices}
                isMulti
                onChange={updateEnginesState}
              />
            </div>
            <div>
              <label>Languages Used</label>
              <Select
                className="multiSelect"
                options={languageChoices}
                isMulti
                onChange={updateLanguagesState}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "500px",
          }}
        >
          <button style={{ backgroundColor: "red" }} onClick={deleteIt}>
            Delete Project
          </button>
          <button>Submit Edited Project</button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectPage;
