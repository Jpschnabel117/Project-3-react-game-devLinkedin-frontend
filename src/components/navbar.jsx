import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoggedIn && (
        <div>
          <Link to="/submitproject">
            <button>Submit Your Game</button>
          </Link>
          <Link to="/profile">
            <button>{`${user.displayName.toUpperCase()}`}</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to="/submitproject">
            <button>Submit Your Game</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
