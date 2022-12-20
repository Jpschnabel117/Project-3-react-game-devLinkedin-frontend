import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
   const { storeToken, authenticateUser } = useContext(AuthContext);

   const navigate = useNavigate();
   const [state, setState] = useState({
    email: "",
    password: "",
  });

  const updateState = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    axios
      .post("http://localhost:3001/auth/login", {
        email: state.email,
        password: state.password,
      }) // or just pass state, as the second argument, not the full object
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        storeToken(axiosResponse.data.authToken);
        authenticateUser()
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-screen">
      <form className="login-form" onSubmit={onFormSubmit}>
        <h1>Login</h1>
        <label>Email</label>
        <input value={state.email} name="email" onChange={updateState} />
        <label>Password</label>
        <input value={state.password} name="password" onChange={updateState} />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
