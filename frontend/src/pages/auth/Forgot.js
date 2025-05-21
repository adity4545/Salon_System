import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import { forgotPassword, validateEmail } from "../../services/authService";
import './auth.css';

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your Email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
  };

  return (
    <div className="authWrapper">
      <Card cardClass="formCard">
        <div className="form">
          <div className="iconCenter">
            <AiOutlineMail size={35} color="#000" />
          </div>
          <h2 className="title">Get Reset Email</h2>
          <form onSubmit={forgot} className="authForm">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="authButton">
              Get Reset Email
            </button>
            <div className="links">
              <p>
                <Link to="/">- Home</Link>
              </p>

              <p>
                <Link to="/register">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
