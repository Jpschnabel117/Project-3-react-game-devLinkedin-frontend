import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import EditProject from "../components/editproject";
//import NewTask from "../components/newtask";
import { useNavigate } from "react-router-dom";

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  //const [showTask, setShowTask] = useState(false);

  const getProjectDetails = () => {
    axios
      .get(`http://localhost:3001/api/projects/${projectId}`, {})
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setProject(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  const deleteIt = () => {
    axios
      .delete(`http://localhost:3001/api/projects/${project._id}`, {
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
      <h1>Project details page</h1>
      {project ? (
        <div>
          <h3>{project.title}</h3>
          <h4>created by: {project.owner}</h4>
          <h4>{project.description.short}</h4>
          <p>{project.description.long}</p>
          <button onClick={deleteIt}>delete project</button>
          <ol>
            {project.comments.map((singleComment) => {
              return (
                <li className="comment" key={singleComment}>
                  {singleComment}
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
