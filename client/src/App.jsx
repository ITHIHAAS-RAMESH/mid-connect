import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";

import Home from "./components/Home";
import Userdetails from "./components/Userdetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/user" element={<Userdetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
