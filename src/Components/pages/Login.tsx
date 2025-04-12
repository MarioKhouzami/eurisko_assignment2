import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Fill all the required fields!");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          body: {
            email,
            password,
          },
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (email === "academy@gmail.com" && password === "academy123") {
          console.log("Login response Data : ", data);
          setAuth(data.result.data.accessToken, data.result.data.expiresIn);
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        } else {
          setError("Your credentials are invalid");
        }
      } else {
        setError(data.message || "Your credentials are invalid");
      }
    } catch (err) {
      console.log(err);
      setError("Please wait, An Error has occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outter-login">
      <form onSubmit={handleLogin} className="inner-login">
        <h2 className="login-header">Login</h2>

        {error && <div className="login-error-msg">{error}</div>}

        {/* Email Field */}
        <div className="outter-email">
          <label className="email-header">Email</label>
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="outter-pass">
          <label className="password-header">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="password-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="eye-btn"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;
