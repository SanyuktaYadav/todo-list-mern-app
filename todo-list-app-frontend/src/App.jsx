import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
