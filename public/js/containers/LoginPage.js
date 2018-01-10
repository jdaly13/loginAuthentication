import React from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.js';
import { Redirect } from 'react-router';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      authenticated: false,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }


  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        // change the component-container state
        this.setState({
		      successMessage: xhr.response.message
        });

        // save the token
        if (Auth.authenticateUser(xhr.response.token)) {
          this.setState({
            authenticated: true
          })
        } else {
          this.setState({
            errors: {
              summary: xhr.response.message
            }
          })
        }



      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }


  render() {
    return (
      <div>
        {this.state.authenticated ? (
            <Redirect to="/me" />
            ) : (
              <LoginForm
              onSubmit={this.processForm}
              errors={this.state.errors}
              onChange={this.changeUser}
              successMessage={this.state.successMessage}
              user={this.state.user}
            />
            )}

      </div>
    );
  }

}

export default LoginPage;
