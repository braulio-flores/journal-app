import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

const LoginScreen = () => {
  const { loading } = useSelector((state) => state.ui);

  const { valuesForm, handleInputChange } = useForm({
    email: "bfloresl1400@alumno.ipn.mx",
    password: "123456",
  });

  const { email, password } = valuesForm;

  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form
        onSubmit={handleLoginSubmit}
        
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>
        <div className="auth__solcial-networks">
          <p>Login with Social Networks</p>
          <div className="google-btn" onClick={handleLoginWithGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new Account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
