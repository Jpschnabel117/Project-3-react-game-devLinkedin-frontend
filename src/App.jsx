import { useState } from "react";
import Navbar from "./components/navbar";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import SignUpPage from "./pages/signuppage";
import Homepage from "./pages/homepage";
import IsPrivate from "./components/isprivate";
import IsAnon from "./components/isanon";
import Profilepage from "./pages/profilepage";
import SubmitProjectPage from "./pages/submitprojectpage";
import ProjectDetailsPage from "./pages/projectdetailspage";
import MyProjects from "./pages/myprojectspage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <div className="mainscreen">
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
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route
            path="/profile/:userId"
            element={<IsPrivate>{<Profilepage />}</IsPrivate>}
          />
          <Route
            path="/submitproject"
            element={
              <IsPrivate>
                <SubmitProjectPage />
              </IsPrivate>
            }
          />
          <Route
            path="/myprojects"
            element={
              <IsPrivate>
                <MyProjects />
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
