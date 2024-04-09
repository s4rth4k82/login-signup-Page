import { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url = "http://localhost:8080/api/auth";
  //     const { data: res } = await axios.post(url, data);
  //     localStorage.setItem("token", res.data);
  //     window.location = "/";
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setError(error.response.data.message);
  //     }
  //   }
  // };

  const {googleSignIn} = UserAuth();

  const handleGoogleSignin = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}

            <div className={styles.mbuttons}>
              <div className={styles.normalsignup}>
                <button type="submit" className={styles.green_btn}>
                  SignIn
                </button>
              </div>
              <div className={styles.or}>-----------OR-----------</div>
              <div className={styles.googlebutton}>
                <GoogleButton onClick={handleGoogleSignin}/>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
