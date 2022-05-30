import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons' 
import { set } from "date-fns/esm";

const Login = ({type}) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  useEffect (() => {
    dispatch( {type: "RESET"} )
    setCredentials({
      username: "",
      password: "",
    })
  }, type)

  return (
    <>
    <Navbar/>
    <Header type="list"/>
    <div className="login">
      <div className="lContainer">
        <span className="loginTitle"> {type === "signin" ? "Sign in" : "Register"}</span>
        <span className="inputLabel">Email Address/Username</span>
        <input
          type="text"
          placeholder=""
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <span className="inputLabel">Password</span>
        <input
          type="password"
          placeholder=""
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <button style={{"margin-top": "20px"}} disabled={loading} onClick={handleClick} className="lButton">
        {type === "signin" ? "Sign in" : "Register"}
        </button>
        {error && <span className="loginError">{error.message}</span>}

        {type === "signin" && 
        <div className="lThirdParties">
          <button disabled={loading} className="lGoogleButton">
            <FontAwesomeIcon size="lg" pull="left" icon={faGoogle}/>
            Sign in with Google
          </button>
          <button disabled={loading} className="lFacebookButton">
            <FontAwesomeIcon size="lg" pull="left" icon={faFacebookF}/> 
            Sign in with Facebook
          </button>
        </div>}
      </div>
    </div>
    </>
  );
};

export default Login;