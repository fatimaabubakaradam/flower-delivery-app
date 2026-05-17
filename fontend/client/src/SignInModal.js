import { useState, useContext } from "react";
import AuthContext from "./AuthContext";

const SignInModal = ({ onClose }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const token = "fake-jwt-token"; 
    login(token);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleLogin}>
          Sign In
        </button>
        <button className="w-full mt-2 text-red-500" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
