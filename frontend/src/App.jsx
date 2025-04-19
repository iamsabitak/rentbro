import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignIn from "./login/SignIn";
import Signup from "./login/SignUp";
import { useState } from "react";
import RoomDetail from "./components/RoomDetail";
import AuthPage from "./login/AuthPage";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigation setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signin"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/authpage"
            element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/rooms/:id" element={<RoomDetail />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
