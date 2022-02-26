import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import { setError, unsetError } from "../../actions/ui";
import { startRegisterWithEmailPasswordNname } from "../../actions/auth";


const RegisterScreen = () => {

  const dispatch = useDispatch()

  const { valuesForm, handleInputChange, reset } = useForm({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  
  const {name, email, password, password2 } = valuesForm;

  const { messageError } = useSelector(state=>state.ui);

  const handleRegisterForm = (e) =>{
    e.preventDefault();
    if (isValidateForm()) {
      console.log('Validate');
      dispatch(unsetError())
      reset();
      dispatch(startRegisterWithEmailPasswordNname(email, password, name));
    }
    
  } 

  const isValidateForm = ()=>{
    if(name.length === 0){
      dispatch(setError('Name is required'));
      return false;
    }else if (!validator.isEmail(email)){
      dispatch(setError('Write a valid email'));
      return false;
    }else if (password !== password2 || password<6) {
      dispatch(setError('Passwords must match and should be at least 6 characters'));
      return false;
    }
    return true;
  }


  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={ handleRegisterForm } >
        {
          !!messageError &&
            <div className="auth__alert-error">
              {messageError}
            </div>
        }
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="auth__input"
          onChange={ handleInputChange }
          value={ name }
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="auth__input"
          onChange={ handleInputChange }
          value={ email }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth__input"
          onChange={ handleInputChange }
          value={ password }
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="auth__input"
          onChange={ handleInputChange }
          value={ password2 }
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>
        
        <Link to="/auth/login" className="link mt-5 mb-5">
          Already Register? Login
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
