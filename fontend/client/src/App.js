import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Import CSS styles
import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./Category";
import Product from "./Product";
import About from "./About";
import { AuthProvider } from "./AuthContext";

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
