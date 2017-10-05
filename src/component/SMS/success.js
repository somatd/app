import React from 'react';
import Styles from './styles.css';

export class Success extends React.Component {
 constructor(){
  super();
 }

render(){
  var result = this.props.location.state
  var code = result.response.code
  var status = result.response.status

return(
  <div className="final">
   <p style={{fontSize:'35px', marginLeft:'-200px'}}>Successfully Logged in to your TD AmeritradeAccount</p>
  </div>
);
}
}

export default Success;
