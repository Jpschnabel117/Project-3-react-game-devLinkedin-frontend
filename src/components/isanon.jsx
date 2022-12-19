import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isLoggedIn) {
    return <Navigate to="/login" />; //a component requires jsx, so navigate
  }

  return props.children;
}

export default IsAnon;
