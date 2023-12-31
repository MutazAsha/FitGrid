import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../hooks/Authcontext";
import Swal from 'sweetalert2';

const SignIn = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userGoogle, setUserGoogle] = useState([]);
  const navigate = useNavigate();
  // const { login } = useAuth();
  // console.log(userGoogle);
  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    // console.log("userGoogle:", userGoogle);

    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          // console.log("Google User Info:", res.data);
          

          try {
            const response = await axios.post(
              "http://localhost:8080/logins",
              res.data
            );
            console.log("Server response:", response.data);

            const token = response.data.token;
            // console.log("issa", response.data);
            // Make sure the token is not undefined or null before storing it
            if (token) {
              // const token = response.data.accessToken; // Make sure to access the correct property
              const user_id = response.data.Id; // Make sure to access the correct property
              const role_id = response.data.userRole;
              console.log("Token:", token);

              Cookies.set("token", token);
              Cookies.set("user_id", user_id);
              Cookies.set("role_id", role_id);
              navigate("/");
            }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  }, [userGoogle, navigate]);

  const handleSignIn = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/login", {
        usernameOrEmail: username,
        password: password,
      });

      // Log the entire response to inspect its structure
      console.log("Response:", response.data);

      const token = response.data.accessToken; // Make sure to access the correct property
      const user_id = response.data.Id; // Make sure to access the correct property
      const role_id = response.data.userRole;
      console.log("Token:", token);

      Cookies.set("token", token);
      Cookies.set("user_id", user_id);
      Cookies.set("role_id", role_id);

      setError("Sign-in successful");
      history("/");
      const result = await Swal.fire({
        icon: 'success',
        title: 'Successfully logged in',
        text: "Welcome To FitGrid",
        showConfirmButton: true,
        // timer: 5000, // Set a timer for 5 seconds (adjust as needed)
        // confirmButtonText: 'OK',
      });
      console.log("Sign-in successful:", response.data);
    } catch (error) {
      console.error("Sign-in error:", error);

      // Adjust error message based on the structure of the error response
      setError("Sign-in failed. Username or password is invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <br />
        <br />
        <button
          onClick={handleSignIn}
          className={`w-full p-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-md mt-4 hover:opacity-90 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <br />
        <br />
        <p className="text-center text-sm text-gray-700">
          Don't have an account yet?
          <a
            href="/Signup"
            className="font-semibold text-indigo-500 hover:underline focus:text-indigo-800 focus:outline-none"
          >
            Sign up
          </a>
          .
        </p>
        <div className="mt-6">
          <button
            onClick={() => loginbygoogle()}
            className="flex items-center justify-center w-full bg-gray-200 p-3 rounded-md"
          >
            <img
              className="w-6 h-6 mr-2"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
