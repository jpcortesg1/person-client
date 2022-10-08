import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import "./app.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import CreatePerson from "./pages/createPerson/CreatePerson";
import Auth from "./service/Auth";
import Person from "./pages/person/Person";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Auth />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/create-person"
            element={
              isAuthenticated ? <CreatePerson /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            path="/person/:id"
            element={isAuthenticated ? <Person /> : <Navigate to="/login" />}
          ></Route>

          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
