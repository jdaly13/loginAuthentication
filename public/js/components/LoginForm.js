import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => {
  return (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {errors && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input
          placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <button type="submit" > Login </button>
      </div>

      <h2>Don't have an account? <Link to={'/signup'}>Create one</Link></h2>
    </form>
  </div>
  );
};


export default LoginForm;
