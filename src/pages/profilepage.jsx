import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Profilepage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  const getUserDetails = () => {
    axios
      .get(`http://localhost:3001/api/user/${userId}`, {})
      .then((axiosResponse) => {
        console.log("Details response:", axiosResponse.data);
        setViewingUser(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const deleteIt = () => {
    axios
      .delete(`http://localhost:3001/api/user/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ProjectDetails">
      <h1></h1>
      {viewingUser ? (
        <div>
          <img src="/public/vite.svg" alt="" />
          <h3>{viewingUser.displayName}</h3>
          <h4>{viewingUser.description.short}</h4>
          <p>{viewingUser.description.long}</p>

          {isLoggedIn && (
            <>
              {viewingUser._id === user._id && (
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
                  {singleComment.comment} {singleComment.owner.displayName}
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
};

export default Profilepage;
