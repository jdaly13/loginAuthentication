import React from 'react';
import Auth from '../modules/Auth';
import UserProfile from '../components/Dashboard.js';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      success: false
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          name: xhr.response.name,
          email: xhr.response.email,
          success: xhr.response.success
        });
      }
    });
    xhr.send();
  }

  render() {
		if (this.state.success) {
    	return (<UserProfile  data={this.state} />);
		} else {
			return (<div>Loading ... </div>)					
		}
  }

}

export default DashboardPage;
