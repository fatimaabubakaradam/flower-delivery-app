import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./Category";
import Category1 from "./Category1"
import Category2 from "./Category2"
import Category3 from "./Category3"
import SignUp from "./signup";

import Product from "./Product";
import About from "./About";
import SignIn from "./signin";
import Checkout from "./Checkout";
import Cart from "./cart";
import Contact from "./contact";
import PaymentSuccess from "./PaymentSuccess"; // Make sure file name matches exactly
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category1" element={<Category1 />} />
          <Route path="/category2" element={<Category2 />} />
          <Route path="/category3" element={<Category3 />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
