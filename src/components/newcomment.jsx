import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NewComment(props) {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const { projectId } = useParams();

  const handleCommentInput = (e) => setComment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/api/projects/${projectId}/comment`,
        {
          comment: comment,
          project: projectId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        props.getProjectDetails();
      })
      .catch((err) => console.log(err));

    const newComment = { comment };

    console.log("Submitted: ", newComment);
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <textarea
          className="commentinput"
          name="comment"
          value={comment}
          onChange={handleCommentInput}
        />
        <button type="submit">Submit New Comment</button>
      </form>
    </div>
  );
}
export default NewComment;
