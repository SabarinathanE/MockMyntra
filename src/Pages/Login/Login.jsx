import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginErrorStatus,
  loginStatus,
  storeLoginDetails,
} from "../../Redux/Recducer/LoginReducer";
import { handleChange } from "../../Utils";
import { MyntraApi } from "../../Components/Axios/Api";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const dispatcher = useDispatch();
  const Navigate = useNavigate();
  const { loginData, loginError } = useSelector((state) => state.Login);

  const handleLogin = async () => {
    let res = await MyntraApi.get("/login");
    const newError = { email: "", password: "", login: "Incorrect Password" };

    if (loginData) {
      const { email, password } = loginData;
      const { email: serverMail, password: serverPassword } = res.data;
      if (!email || !/^\S+@\S+\.\S+$/.test(loginData.email)) {
        newError.email = "Invalid email Format";
      }
      if (!password || password.length < 5) {
        newError.password = "Password should be atleast 5 Characters";
      }
      if (email === serverMail && password === serverPassword) {
        dispatcher(loginStatus(true));
        localStorage.setItem("isLoggedIn", "true");
        Navigate("/");
      } else dispatcher(loginErrorStatus(newError));
    } else return;
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-start">
      <div className="login-page px-5 border rounded-3 ">
        <div className="d-flex flex-column">
          <h2 className="mb-2">Welcome!</h2>
          <p className="mb-4">Enter Your Details!</p>
          <label htmlFor="">Email address</label>
          <input
          className="mb-3 border-1 rounded-2 p-2"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={loginData.email}
            onChange={(e) => handleChange(e, dispatcher, storeLoginDetails)}
          />
          {loginError.email && <pre className="m-0 p-0 text-danger">{loginError.email}</pre>}
          <label htmlFor="">Password</label>
          <input
          className="mb-4 border-1 rounded-2 p-2"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={loginData.password}
            onChange={(e) => handleChange(e, dispatcher, storeLoginDetails)}
          />
          {loginError.password && <pre className="m-0 p-0 text-danger">{loginError.password}</pre>}
          {loginError.login && <pre className="m-0 p-0 text-danger">{loginError.login}</pre>}
          <div >
            <button className="login-btn w-100 rounded-2 mb-2 p-1" onClick={handleLogin}>Login</button>
            <button className="sign-in-btn w-100 rounded-2 p-1"><FcGoogle /> Sign in With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

