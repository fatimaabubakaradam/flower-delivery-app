import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./Category";
import Product from "./Product";
import About from "./About";
import SignIn from "./signin"; 
import Checkout from "./Checkout"
import Cart from "./cart"
import { AuthProvider } from "./AuthContext";
import Contact from "./contact"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/cart"  element={<Cart />} />
          <Route path="/contact"  element={<Contact />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
