import React, { useState, useEffect } from 'react';
import { Alert, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return; 
    }

    const currentUser = { name, email, password };

    if (isMember) {
      await loginUser(currentUser); // Await the login function
      if (user) { // Check if user is defined after login
        navigate('/dashboard'); // Redirect to dashboard
      }
    } else {
      await registerUser(currentUser); // Handle registration
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <img src={Logo} alt="" />
        <h3>{values.isMember ? "Log In" : "Register"}</h3>
        {showAlert && <Alert />}

        {!values.isMember && (
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>Submit</button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type='button'
            onClick={toggleMember}
            className="member-btn">
            {values.isMember ? 'Register' : 'Log In'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
