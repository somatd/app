import React from "react";
import { Model, Button, Col, FormControl} from "react-bootstrap";
import { browserHistory } from 'react-router';
import Styles from "./styles.css";
import HttpHelper from '../../Util/httpHelper';

export class SecurityCenter extends React.Component {
	constructor(){
		super();

		this.state ={
			authCode : ""
		};

		this.onClickCancel = this.onClickCancel.bind(this)
		this.onHandleChange = this.onHandleChange.bind(this)
	}

onHandleChange(from, value) {
	this.state.authCode = value;
	this.setState({...this.state});
}

onClickCancel(event){
	this.props.history.push('/');
}

doContinue(eve){
	eve.preventDefault();
	var result = this.props.location.state
	var token = result.response.token
	var type = result.response.type
	let data = {
		token : token,
		credentials : [{
			"type" :  type,
			"value" : this.state.authCode
		}]
	}

	let axiosConfig ={
		headers : {'content-type': 'application/JSON'}
	};
	var result = 0;
	HttpHelper('http://devctlvivtapp01.iteclientsys.local:8180/oauth2-v1/eas-v2/percolator', 'post', data, (err, response) => {
		if (err){
			alert('ERROR: '+err.message)
			return
		}
		result = response.status;
		if(result == 200) {
			this.props.history.push({
				pathname: '/success',
				state: {
					response: response.data
				}
			})
		}else{
			this.props.history.push('/securityCenter');
		}
	})
}

renderMessage(type){
	if(type == 'SMS'){
		return  (<div>
			<h4>Security code</h4>
			<p>Please enter the code we sent you . If you do not receive the code after few mins.<a href="">request a new security code.</a></p>
			<p><b>Important:</b> DO not navigate away from this page while checking for your code. Please enter your code within 30 minutes of when it sent.</p><br/><br/>
		</div>)
	}else if(type == 'TOTP') {
		return  (
			<div>
				<h4>Security code</h4>
				<p>Please enter the code displayed on your Google Authenticator .</p>
				<p><b>Important:</b> DO not navigate away from this page while checking for your code.</p><br/><br/>
			</div>
		)
	}
}

render(){
	var result = this.props.location.state
	var token = result.response.token
	var type = result.response.type
return(
	<div className="container">
		<Col md={8} mdOffset={2}>
		<div className="message">
			{this.renderMessage(type)}
		</div>
		<div className="message">
			<h4>Security code</h4>
				<FormControl  className = "textBox" type="text"
						onChange={(e) => { this.onHandleChange('authCode', e.target.value) }}
						placeholder="123XYZ"/>
		</div>
		<div className="contact1">
			<h5><b>Need Help? Call us.</b></h5>
			<h5>US:800-669-3900</h5>
			<h5>International:800-368-3668</h5>
		</div>
			<Button className="button2" type="submit"  onClick={(eve)=>this.doContinue(eve)} >Contiue</Button>
			<Button className="button1" type="submit"  onClick={this.onClickCancel} >Cancel</Button>
		</Col>
		</div>
);
}
}

export default SecurityCenter;
