
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => (
  <div className="container">
  {console.log(props)}
    <h1>404 page not found</h1>
    <p>We are sorry but the page you are looking for does not exist.</p>
    {/*<p><Link to="/">home</Link></p> */}   
    <p><a href="/">home</a></p>
  </div>
)

export default NotFound;