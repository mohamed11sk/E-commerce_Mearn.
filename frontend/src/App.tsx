import { BrowserRouter, Routes, Route } from "react-router";


import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <BrowserRouter>
          <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;