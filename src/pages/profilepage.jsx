import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditUserPage from "./edituserpage";

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

  return (
    <div className="ProjectDetails">
      <h1></h1>
      {viewingUser ? (
        <div>
          <img src="/public/vite.svg" alt="" />
          <h3>{viewingUser.displayName}</h3>
          <h4>{viewingUser.description.short}</h4>
          <p>{viewingUser.description.long}</p>
          <div className="userSkills">
            <div>
              <span>Engines:</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {viewingUser.tech.engines.map((element) => {
                  return <div className="skill-tag">{element}</div>;
                })}
              </div>
              <br />
            </div>
            <div>
              <span>Languages:</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {viewingUser.tech.languages.map((element) => {
                  return <div className="skill-tag">{element}</div>;
                })}
              </div>
              <br />
            </div>
            <div>
              <span>Socials: </span>
              <div>
                {viewingUser.links.github !== "" && (
                  <div className="social-link">
                    Github: {viewingUser.links.github}
                  </div>
                )}
                {viewingUser.links.patreon !== "" && (
                  <div className="social-link">
                    Patreon: {viewingUser.links.patreon}
                  </div>
                )}
                {viewingUser.links.steam !== "" && (
                  <div className="social-link">
                    Steam: {viewingUser.links.steam}
                  </div>
                )}
                {viewingUser.links.discord !== "" && (
                  <div className="social-link">
                    Discord: {viewingUser.links.discord}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isLoggedIn && (
            <>
              {viewingUser._id === user._id && (
                <>
                  {showEdit ? (
                    <>
                      <button onClick={() => setShowEdit(false)}>
                        Hide Editing
                      </button>
                      <EditUserPage
                        email={viewingUser.email}
                        displayName={viewingUser.displayName}
                        descriptionShort={viewingUser.description.short}
                        descriptionLong={viewingUser.description.long}
                        techEngines={viewingUser.tech.engines}
                        techLanguages={viewingUser.tech.languages}
                        linksGithub={viewingUser.links.github}
                        linksSteam={viewingUser.links.steam}
                        linksPatreon={viewingUser.links.patreon}
                        linksDiscord={viewingUser.links.discord}
                        lookingForJob={viewingUser.lookingForJob}
                        id={viewingUser._id}
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
        </div>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
};

export default Profilepage;
