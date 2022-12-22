import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import EditProjectPage from "./editprojectpage";
import NewComment from "../components/newcomment";

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  // const [showTask, setShowTask] = useState(false);

  const getProjectDetails = () => {
    axios
      .get(`http://localhost:3001/api/projects/${projectId}`, {})

      .then((axiosResponse) => {
        console.log("Details response:", axiosResponse.data);
        setProject(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  // const deleteIt = () => {
  //   axios
  //     .delete(`http://localhost:3001/api/projects/${project._id}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((axiosResponse) => {
  //       console.log(axiosResponse.data);
  //       navigate("/");
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="ProjectDetails">
      <h1>Project details page</h1>
      {project ? (
        <div>
          <img src="/public/vite.svg" alt="" />
          <h3>{project.title}</h3>
          <Link to={`/profile/${project.owner._id}`}>
            <h4>created by: {project.owner.displayName}</h4>
          </Link>

          <h4>{project.description.short}</h4>
          <p>{project.description.long}</p>

          <div className="userSkills">
            <div>
              <span>Engines:</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {project.tech.engines.map((element) => {
                  return <div className="skill-tag">{element}</div>;
                })}
              </div>
              <br />
            </div>
            <div>
              <span>Languages:</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {project.tech.languages.map((element) => {
                  return <div className="skill-tag">{element}</div>;
                })}
              </div>
              <br />
            </div>
            <div>
              <span>Socials: </span>
              <div>
                {project.links.github !== "" && (
                  <div className="social-link">
                    Github: {project.links.github}
                  </div>
                )}
                {project.links.patreon !== "" && (
                  <div className="social-link">
                    Patreon: {project.links.patreon}
                  </div>
                )}
                {project.links.steam !== "" && (
                  <div className="social-link">
                    Steam: {project.links.steam}
                  </div>
                )}
                {project.links.discord !== "" && (
                  <div className="social-link">
                    Discord: {project.links.discord}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isLoggedIn && (
            <>
              {project.owner._id === user._id && (
                <>
                  {showEdit ? (
                    <>
                      <button onClick={() => setShowEdit(false)}>
                        Hide Editing
                      </button>
                      <EditProjectPage
                        title={project.title}
                        descriptionShort={project.description.short}
                        descriptionLong={project.description.long}
                        techEngines={project.tech.engines}
                        techLanguages={project.tech.languages}
                        linksGithub={project.links.github}
                        linksSteam={project.links.steam}
                        linksPatreon={project.links.patreon}
                        linksDiscord={project.links.discord}
                        hiring={project.hiring}
                        id={project._id}
                      />
                    </>
                  ) : (
                    <button onClick={() => setShowEdit(true)}>
                      Show Editing
                    </button>
                  )}
                </>
              )}
            </>
          )}

          <NewComment getProjectDetails={getProjectDetails} />
          <div className="comment-section">
            {project.comments.map((singleComment) => {
              return (
                <div className="comment">
                  <div>{singleComment.owner.displayName}</div>
                  <div>{singleComment.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
