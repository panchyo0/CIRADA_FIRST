
import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'antd/dist/antd.css';
import SiderBar from './containers/Layout';
import BaseRouter from './routes';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'; 
import Login from './containers/Login';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSingup();
  }

  render() {
    return (
      <div className="App">
        <Router>
          {
            this.props.isAuthenticated? 
              <SiderBar {...this.props}>
                <BaseRouter/>
              </SiderBar>
            :
            <Login/>
          
          }
        </Router>
      </div>
    );
  }
}


const mapStateToProps=state=>{
  return {
    isAuthenticated:state.authReducer.token!==null,
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onTryAutoSingup:()=>dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
