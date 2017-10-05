import React from 'react';
import { Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, sm, Button, smOffset } from 'react-bootstrap';
import HttpHelper from '../../Util/httpHelper';
import Radio from '../common/Radiobtn';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router';
//import { connect } from 'react-redux';


class SelectAuthenticator extends React.Component {
	constructor() {
		super();

		this.radioClicked = this.radioClicked.bind(this);
		this.state = {
			showOption: false,
			selectedPhoneNumber: null,
	    currentSelection: null
		}
	}

componentDidMount() {
}

radioClicked(e) {
	//console.log(e.target.value)
	if (e.target.value == 'Text Message') {
		this.setState(
			{ showOption: true ,
			  selectedPhoneNumber: null ,
				currentSelection: 'SMS'
			})
	}else if(e.target.value == 'Use Google Authenticator' ){
		this.setState(
			{ showOption: false ,
				selectedPhoneNumber: null,
				currentSelection: 'TOTP'
			})
	}else if (e.target.value == 'Phone call'){
   this.setState(
		 { showOption: true ,
			 selectedPhoneNumber: null ,
			 currentSelection: 'PHONE'
		 })
  }
}

phoneSelectClicked(e){
	this.setState({ selectedPhoneNumber: e.target.value })
}

renderRadiobtn() {
//console.log('INSIDE renderRadiobtn() 1')
 var result = this.props.location.state
 // console.log("Inside render() of sms.js ="+(result.response.token))
 // console.log("Inside render() of sms.js ="+(result.response.status))
  console.log("Inside render() of sms.js ="+JSON.stringify(result))
 var credentialList = result.response.next_credential;
 var deviceList = credentialList;
 // console.log('INSIDE renderRadiobtn() 2')
 //console.log("deviceList = "+JSON.stringify(deviceList));
 var smsFlag = false;
 var totpFlag = false;
 var phoneFlag = false;
 var smsIcon = 'glyphicon glyphicon-envelope';
 var totpIcon = 'glyphicon glyphicon-user';
 var phoneIcon = 'glyphicon glyphicon-phone';
 var smsMessage = 'Text Message';
 var totpMessage = 'Use Google Authenticator';
 var phoneMessage = 'Phone call';
 var securityList = [];
 credentialList.map((item, i) => {
  if(smsFlag && totpFlag && phoneFlag){
   return
  }
  if(item.type == 'SMS' && !smsFlag){
   smsFlag = true;
   securityList.push({'name': 'Security' , 'value': smsMessage , 'icon':smsIcon})
  }
  else if(item.type == 'TOTP' && !totpFlag){
   totpFlag = true;
   securityList.push({'name': 'Security' , 'value': totpMessage , 'icon':totpIcon})
  }
  else if(item.type == 'PHONE' && !phoneFlag){
   phoneFlag = true;
   securityList.push({'name': 'Security' , 'value': phoneMessage , 'icon':phoneIcon})
  }
 })
 //console.log('securityList->'+JSON.stringify(securityList));
 return securityList.map((item, i) => {
 return (
  <div>
  <span key={i} style={{ display: 'inline-block' }}>
   <input type="radio" name={item.name} value={item.value} onClick={this.radioClicked.bind(this)} /><i style={{ padding: '0px 10px' }} className={item.icon}></i>{item.value} <br />
  </span>
  {((this.state.showOption && i == 0 && this.state.currentSelection=='SMS') ||
  (this.state.showOption && i == 1 && this.state.currentSelection=='PHONE')) ? <span><FormGroup style={{display:'inline-block'}} controlId="formControlsSelect">
   <FormControl  componentClass="select" placeholder="select" onClick={this.phoneSelectClicked.bind(this)} >
   {
    credentialList.map((sitem, s) => {
     if(this.state.currentSelection=='SMS' && sitem.type == 'SMS'){
      return <option value={sitem.id}>(***)-***-{sitem.prompt}</option>
     }else if(this.state.currentSelection=='PHONE' && sitem.type == 'PHONE'){
      return <option value={sitem.id}>(***)-***-{sitem.prompt}</option>
     }
    })
   }
   </FormControl>
  </FormGroup></span> : null}
  </div>)
})
}
doSubmit(eve){
  eve.preventDefault();
	// var result = this.props.location.state
	// var next_credential = result.response.next_credential
	//console.log("result in submit() = "+JSON.stringify(next_credential));
	if (this.state.currentSelection == 'SMS') {
		this.doSmsSubmit(eve)
	} else if (this.state.currentSelection == 'TOTP'){
		this.doTotpSubmit(eve)
	} else if (this.state.currentSelection == 'PHONE') {
		this.doPhoneSubmit(eve)
	}
}

doSmsSubmit(eve) {
	var result = this.props.location.state;
	var token = result.response.token;
	var selectedPhoneNumber = this.state.selectedPhoneNumber;
	//console.log('selectedPhoneNumber='+selectedPhoneNumber);
	let data = {
   	token : token,
   	credential_id : selectedPhoneNumber,
  }
	//console.log("data -> "+data);
	let axiosConfig ={
    headers : {'content-type': 'application/JSON'}
	};
	var result = 0;
	HttpHelper('http://devctlvivtapp01.iteclientsys.local:8180/oauth2-v1/eas-v2/barista', 'post', data, (err, response) => {
    if (err){
      alert('ERROR: '+err.message)
      return
    }
    //  response.finalResponse =
    //         {
    //  token : token,
    //  credential_id : selectedPhoneNumber
    //  }
    result = response.status;

		response.data =
			{
				 'token' : token,
				 'type' : 'SMS'
			};
		// console.log("result.token="+JSON.stringify(response));
		// console.log("result.token="+response.data.token);

		if(result == 200){
			this.props.history.push({pathname:'/securityCenter',
			state:{
				response : response.data
			}
			});
		}
		else{
			this.props.history.push('/selectAuthenticator');
		}
 })
}

doTotpSubmit(e){
	var result = this.props.location.state;
	var token = result.response.token;
	var response = {
		'test' : 'test'
	};
	response.data =
		{
			'token' : token,
			'type' : 'TOTP'
		};
		//console.log(totp);
		this.props.history.push({pathname:'/securityCenter',
		state:{
			response : response.data
		}
		});

}

doPhoneSubmit(eve) {
	var result = this.props.location.state;
	var token = result.response.token;
	var selectedPhoneNumber = this.state.selectedPhoneNumber;
	let data = {
		 token : token,
		 credential_id : selectedPhoneNumber,
	 }
	let axiosConfig ={
		 headers : {'content-type': 'application/JSON'}
	};
	var result = 0;
	HttpHelper('http://devctlvivtapp01.iteclientsys.local:8180/oauth2-v1/eas-v2/barista', 'post', data, (err, response) => {
		 if (err){
			 alert('ERROR: '+err.message)
			 return
		 }
		 console.log("response="+JSON.stringify(response))
		 result = response.status;
	 response.data =
		{
			'token' : token,
			'type' : 'PHONE',
			'prompt' : response.data.prompt
		};
		 console.log("modifiedprompt="+JSON.stringify(response.data))
	 	if(result == 200){
		this.props.history.push({pathname:'/touchtone',
		state:{
		 response : response.data
		}
		});
	 }
	 else{
		this.props.history.push('/selectAuthenticator');
	 }
	})
}

render() {
	//console.log('INSIDE render()')
	return (
		<div>
		<div className="container">
			<Col md={8} mdOffset={2}>
				<FormGroup>
					<h1>Security Challenge</h1>
						<h3>To validate you identity. please select one of the following methods:</h3>
      				{this.renderRadiobtn()}
						<hr style={{ "borderTop":"1px solid #b1b1b1" }}/>
						<div>
							<input type="checkbox" style={{verticalAlign:'-2px'}} name="remember" value="Use this same method in future" /> Use this same method in future
						</div><br/>
						<Col smOffset={2} sm={10}>
							<Button className="button" onClick={(eve)=>this.doSubmit(eve)} type="button">Next</Button>
						</Col>
				</FormGroup>
			</Col>
		</div>
		</div>
	);
}
}


function mapStateToProps(state) {
	return {
		sms: state.sms
	}
}


export default connect(mapStateToProps)(SelectAuthenticator);
