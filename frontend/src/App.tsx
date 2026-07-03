import { BrowserRouter, Routes, Route } from "react-router";


import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Rigesterpage from "./pages/Rigesterpage";
import Authprovider from "./ontext/Auth/Authprovider";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Authprovider>
    <BrowserRouter>
          <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<Rigesterpage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
    </Authprovider>
  );
}

export default App;