import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  message
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>
      {errors && Object.keys(errors).map((error, key)=> {
        return (
          <p key={key} className="errors">{errors[error]} </p>
        )
      })}
      <div className="field-line">
        <input
          placeholder="Name"
          name="name"
          onChange={onChange}
          value={user.name}
        />
      </div>

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
        <button type="submit"> Submit </button>
      </div>

      {message && <h2>{message}</h2>}

      <h2>Already have an account? <Link to={'/login'}>Log in</Link></h2>
    </form>
  </div>
);


export default SignUpForm;
