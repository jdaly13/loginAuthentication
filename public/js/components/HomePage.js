import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props, context) {
    super();
    console.log(context);
    console.log(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className="container">
        <h1>Sample Login Application</h1>
        <div className="field-line actions">
          <Link to={{ pathname: '/login' }}>Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
