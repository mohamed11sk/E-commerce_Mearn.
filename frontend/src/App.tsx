import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Rigesterpage from "./pages/Rigesterpage";
import Authprovider from "./ontext/Auth/Authprovider";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRout from "./components/ProtectedRout";
import CartProvidor from "./ontext/Auth/cart/CartProvidor";
import SuccessOrder from "./pages/SuccessOrder";

function App() {
  return (
    <Authprovider>
      <CartProvidor>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Rigesterpage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRout />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/sucesspage" element={<SuccessOrder />} />
            <Route path="/success-order" element={<SuccessOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvidor>
    </Authprovider>
  );
}

export default App;
