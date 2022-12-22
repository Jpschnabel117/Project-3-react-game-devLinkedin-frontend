import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    displayName: "",
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
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        email: state.email,
        displayName: state.displayName,
        password: state.password,
      }) // or just pass state, as the second argument, not the full object
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-screen">
      <form className="login-form" onSubmit={onFormSubmit}>
        <h1>Sign Up</h1>
        <label>Email</label>
        <input value={state.email} name="email" onChange={updateState} />
        <label>Display Name</label>
        <input value={state.name} name="displayName" onChange={updateState} />
        <label>Password</label>
        <input value={state.password} name="password" onChange={updateState} />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
