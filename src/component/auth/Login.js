import React from 'react';
import { Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, sm, Button, smOffset } from 'react-bootstrap';
import Styles from "./Login.css";
import { browserHistory } from 'react-router';
//import Fingerprint from 'Fingerprint';
import {connect} from 'react-redux';
import { doLogin } from '../../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import HttpHelper from '../../Util/httpHelper';


export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        userid: '',
        password: ''
      },
      posts:[]
    };

    this.onhandlechange = this.onhandlechange.bind(this);
  }


doLogin(eve){
  eve.preventDefault();

    let data ={
      namespace : "AMER.ACCT",
      action : "LOGIN",
      credentials :[{
        type : "PASSWORD",
        value : this.state.credentials.password
      }],
      redirectURI : "",
      device:{},
      token : "",
      userid : this.state.credentials.userid
    }
  //  console.log(data);
    var result = 0;
      HttpHelper('http://devctlvivtapp01.iteclientsys.local:8180/oauth2-v1/eas-v2/percolator', 'post', data , (err, response) => {
        if(err){
          alert('ERROR:' +err.message)
          return;
        }
        result = response.status;
        // console.log("respose.data="+response.data);
        // console.log("result ="+result);
          if(result == 200){
            this.props.history.push({pathname:'/selectAuthenticator',
            state:{
              response : response.data
            }
            });
          }
          else{
            this.props.history.push('/');
          }
        })
}

onhandlechange(from, value) {
  if(from == 'pwd'){
    this.state.credentials.password = value;
    this.setState({...this.state,credentials:{...this.state.credentials,password:value}});
  }else{
    this.state.credentials.userid = value;
    this.setState({...this.state,credentials:{...this.state.credentials,userid:value}});
    this.setState({credentials:{userid:value}})
  }
}

componentDidMount(){
  if(this.props.response.login){
  }
}

componentWillReceiveProps(nextprops){
  if(nextprops.response.login){
  }
}


render() {
  return (
    <div className = "container1">
    <div className="auth">
      <p className="secure"> Secure Log-In </p><br />
      <Col md={6} mdOffset={3}>
      <Form horizontal>
        <div className="IDs">User Id</div>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}></Col>
            <Col sm={10}>
            <FormControl type="text" className="textFeilds"
              value={this.state.credentials.userid}
              onChange={(e) => { this.onhandlechange('user', e.target.value) }}
              placeholder="User Id"/>
            </Col>
            </FormGroup>
            <div className="IDs">Password</div>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}></Col>
              <Col sm={10}>
              <FormControl type="password" className="textFeilds"
                value={this.state.credentials.password}
                onChange={(e) => { this.onhandlechange('pwd', e.target.value) }}
                placeholder="Password"/>
              </Col>
              <div className="forgot">
                <a href="" alt="forgot password">Forgot Password</a>
              </div>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button className="login" onClick={(eve)=>this.doLogin(eve)} type="submit">Log in</Button>
              </Col>
            </FormGroup>
        </Form>
        </Col>

      </div>
      </div>
    );
}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doLogin: doLogin }, dispatch)
}


function mapStateToProps(state) {
  return {
    response:state
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Login);
