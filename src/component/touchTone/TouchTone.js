import React from "react";
import { Model, Button, Col, FormControl} from "react-bootstrap";
import { browserHistory } from 'react-router';
import Styles from "./TouchTone.css";
import HttpHelper from '../../Util/httpHelper';


export class TouchTone extends React.Component {
  constructor() {
    super();
    this.state ={
      timerId : null
    };
    this.onClickCancel = this.onClickCancel.bind(this)
  }

onClickCancel(event){
  this.props.history.push('/sms');
}

componentDidMount(){
  this.startTimer()
}

doContinue(){
  var result = this.props.location.state
  var token = result.response.token
  var type = result.response.type
  let data = {
    token : token,
    "action": "LOGIN",
    credentials : [{
      "type" :  type
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
    result = response.data.status;
    if(result == 'COMPLETE') {
      this.props.history.push({
        pathname: '/success',
        state: {
          response: response.data
        }
      })
      this.stopTimer()
    }
  })
}

startTimer(){
  if(!this.timerId){
    this.timerId = setInterval(()=>{
      this.doContinue();
    }, 3000);
  }
}

stopTimer(){
  clearInterval(this.timerId);
}

render(){
  var result = this.props.location.state
  var token = result.response.token
  var prompt = result.response.prompt
  
return(
  <div>
    <div className= "security">
      <h1>Enter security code</h1>
    </div>
    <div className= "container">
      <div className= "touchToneMessage1">
        <p>We will call you at the number you selected.</p>
        <p>At the prompt, Please enter the following security code on your phone:</p>
      </div>
      <div className="contact_wrapper">
        <div className="codeLeft">
        <span className="securityCode">
          <i className="fa fa-spinner fa-spin"></i> &nbsp;&nbsp;
          <span className="securityText">Waiting for you to enter security code: <b>{prompt}</b> </span>&nbsp;
        </span>
        <Button className="button3" type="submit"  onClick={this.onClickCancel} >Cancel</Button>
        </div>
        <div className="helpContent">
        <h2>Need Help?  Call us.</h2>
        US: 800-669-3900<br/>
        International: 800-368-3668<br/>
        </div> <br/><br/>
      </div>
      <div className="touchToneMessage1">
        <p className="bold">Important: Do not navigate away from this screen or you will have to restart the process.</p>
        <p className="bold">If you entered your security code and the page didnt automatically update with instructions, <a className="continueLink" href="#">continue here.</a></p>
      </div>
    </div>
  </div>
)
}
}

export default TouchTone;
