import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CategoryPage from "./CategoryPage";
import SignUp from "./signup";
import Product from "./Product";
import About from "./About";
import SignIn from "./signin";
import Checkout from "./Checkout";
import Cart from "./cart";
import Contact from "./contact";
import PaymentSuccess from "./PaymentSuccess"; 
import { AuthProvider } from "./AuthContext";
import LoginModal from "./LoginModal";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <LoginModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
