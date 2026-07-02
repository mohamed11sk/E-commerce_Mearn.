import { BrowserRouter, Routes, Route } from "react-router";


import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Rigesterpage from "./pages/Rigesterpage";


function App() {
  return (
    <BrowserRouter>
          <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<Rigesterpage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;