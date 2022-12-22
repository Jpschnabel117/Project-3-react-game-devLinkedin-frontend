import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ThumbsUpButton(props) {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  //let userVotedProject = user.upvoted.find(props.singleProject._id);

  let userVoted;

  const [filled, setFilled] = useState(userVoted);

  const [projectUpvotes, setProjectUpVotes] = useState(
    props.singleProject.upvotes
  );

  function handleClick() {
    setFilled(!filled);
    if (filled) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects/${
            props.singleProject._id
          }/upvote`,
          {
            upvotes: projectUpvotes + 1,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then(() => {
          setProjectUpVotes(projectUpvotes + 1);
          axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/addupvoted/${
              props.singleProject._id
            }`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
        });
    } else {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects/${
            props.singleProject._id
          }/upvote`,
          {
            upvotes: projectUpvotes - 1,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then(() => {
          setProjectUpVotes(projectUpvotes - 1);
          axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteupvoted/${
              props.singleProject._id
            }`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
        });
    }
  }

  return (
    <div>
      {/* {filled ? (
        <button
          className="upvoteButton"
          style={{ backgroundColor: "#007bff" }}
          onClick={handleClick}
        >
          <img
            src="/public/upvote.png"
            className="upvoteimg"
            style={{ height: "35px", width: "35px" }}
          />
        </button>
      ) : (
        <button
          className="upvoteButton"
          style={{
            backgroundColor: "transparent",
          }}
          onClick={handleClick}
        >
          <img
            src="/public/upvote.png"
            className="upvoteimg"
            style={{ height: "35px", width: "35px" }}
          />
        </button>
      )} */}
    </div>
  );
}

export default ThumbsUpButton;
