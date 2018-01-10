import React from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component { 
	constructor(props, context) {
		super(props, context);
		this.data = props.data;
	}

	getDashBoard() {
		return (
			<div>
			<h2>Welcome {this.data.name} </h2>
			</div>
		)
	}

	getHeading() {
		return (
			<div>
				<p className="loginname"> Your login name is {this.data.email} </p>
				<h2>Need to logout <Link to={'/logout'}>Logout</Link></h2>
			</div>
		)
	}



	render () {
		return (
		<div className="container">
			{this.getDashBoard()}
			{this.getHeading()}
		</div>
		);
	}

}


export default UserProfile;
