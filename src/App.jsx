import { useState } from "react";
import Navbar from "./components/navbar";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import SignUpPage from "./pages/signuppage";
import Homepage from "./pages/homepage";
import IsPrivate from "./components/isprivate";
import IsAnon from "./components/isanon";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/projects"
          element={
            <IsPrivate>
              {/* <Projectpage /> */}
            </IsPrivate>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              {/* <ProjectDetailsPage /> */}
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
