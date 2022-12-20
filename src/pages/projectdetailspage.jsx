import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import EditProject from "../components/editproject";
//import NewTask from "../components/newtask";

function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  //const [showTask, setShowTask] = useState(false);

  const getProjectDetails = () => {
    axios
      .get(`http://localhost:3001/api/projects/${projectId}`, {
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setProject(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <div className="ProjectDetails">
      <h1>Project details page</h1>
      {project ? (
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ol>
            {project.tasks.map((singleTask) => {
              return (
                <li className="TaskCard card" key={singleTask}>
                  {singleTask}
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
