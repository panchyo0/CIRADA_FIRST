import React from 'react';
import {Route} from 'react-router-dom';

import Visdb from './containers/VisDb';
import Transient from './containers/Transient';



const BaseRouter=()=>(
    <div>
        <Route exact path='/' component={Transient}></Route>
        <Route exact path='/visdb' component={Visdb}></Route>
    </div>    
);

export default BaseRouter;