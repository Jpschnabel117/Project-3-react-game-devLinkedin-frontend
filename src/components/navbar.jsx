import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { user, isLoggedIn, logOutUser } = useContext(AuthContext)
  
    return (
      <nav>
        {isLoggedIn && (
          <span>
            <h1>Welcome {user.name}</h1>
          </span>
        )}
        <Link to="/">
          <button>Home</button>
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/projects">
              <button>Projects</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
          </>
        )}
      </nav>
    );
  }
  
  export default Navbar;