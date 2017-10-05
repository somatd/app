import React from 'react';
import Styles from './styles.css';

export class Footer extends React.Component {
	constructor(){
		super()
}

render(){
	return(
		<div style={{bottom:"0"}}>
		<div className="links">
			<a href="https://www.tdameritrade.com/about-us.page" alt="About Us" >About Us|</a>
			<a href="https://www.tdameritrade.com/security/minimum-requirements.page" alt="Minimum-Requirements">Minimum-Requirements|</a>
			<a href="https://www.tdameritrade.com/security/privacy.page" alt="Privacy">Privacy|</a>
			<a href="https://www.tdameritrade.com/security.page" alt="Security">Security|</a>
			<a href="https://www.tdameritrade.com/financial-statement" alt="Financial Statement">Financial Statement|</a>
			<a href="http://www.amtd.com/Home/default.aspx" alt="TD Ameritrade Holding Corp">TD Ameritrade Holding Corp|</a>
			<a href="http://www.tdainstitutional.com/" alt="TD Ameritrade Institutional">TD Ameritrade Institutional|</a>
			<a href="https://www.tdameritrade.com/international.page" alt="Other TD Waterhouse Sites">Other TD Waterhouse Sites</a>
			<br/><br/>
		</div>
		<div className="footer1">
		<p>Market volatility, volume and system availability may delay account access and trade executions.</p>
		<p>TD Ameritrade, Inc., member FINRA/SIPC. This is not an offser or solicitation in any jurisdiction where we are not authorized to do business. TD Ameritrade is a trademark jointly owned by TD Ameritrade IP Company, Inc. and The Toronto-Dominion Bank. © 2017 TD Ameritrade IP Company, Inc.All rights reserved</p>
	</div>
	</div>

	);
}
}


export default Footer;
