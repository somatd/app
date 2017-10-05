import React from 'react';
import Styles from './styles.css';


export class Header extends  React.Component {
    constructor(){
    	super()


    }

    render(){
      var image = require('../../images/TDA_Logo_Beta.png')
    	return(
    	<div className="header">
          <img src={ image } />
    	</div>

         );
    }
}

export default Header;
