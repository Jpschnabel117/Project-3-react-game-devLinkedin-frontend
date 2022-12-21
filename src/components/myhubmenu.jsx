import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function MyHubMenu() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
    
  return (
    <div className="navigation">
      <a className="myhub">My Hub</a>
      <div className="navigation-content">
        <Link className="menuLinks" to={`/profile/${user._id}`}>
          <a>Profile</a>
        </Link>
        <Link className="menuLinks" to="/submitproject">
          <a>Submit Your Game</a>
        </Link>
        <Link className="menuLinks" to="/myProjects">
          <a>My Projects</a>
        </Link>
        <Link className="menuLinks" to="/">
          <a>Saved Jobs: N/A</a>
        </Link>
        <Link className="menuLinks" to="/favorites">
          <a>Favorites: N/A</a>
        </Link>
      </div>
    </div>
  );

}

export default MyHubMenu;
