import React from 'react';
import {BrowserRouter,Switch , Route} from 'react-router-dom';
import Login from '../component/auth/Login'
import SelectAuthenticator from '../component/SMS/selectAuthenticator';
import SecurityCenter from '../component/SMS/securityCenter';
import Success from '../component/SMS/success';
import TouchTone from '../component/touchTone/TouchTone';


const Mainroutes = ()=>(
<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Login}/>
		<Route exact path="/selectAuthenticator" component={SelectAuthenticator}/>
		<Route exact path="/securityCenter" component={SecurityCenter}/>
		<Route excat path="/success" component={Success}/>
		<Route excat path="/touchtone" component={TouchTone}/>
	</Switch>
</BrowserRouter>
)

export default Mainroutes
