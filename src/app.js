import React from 'react';
import { Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, sm, Button, smOffset } from 'react-bootstrap';
import { render } from 'react-dom';
import Login from './component/auth/Login';
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Styles from './app.css';
import Main from './routes/routes';
import config from './config'

class App extends React.Component {
  render() {
    return (
      <div className="body">
        <Col>
          <Header />
            <Col bsClass="container">
            <Col md={12} >
              <Main />
            </Col>
            </Col>
          <Footer />
        </Col>
      </div>
    );
  }
}

export default App;
