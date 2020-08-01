import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SignIn from './SignIn';
import Change from './Change';

function App() {
  return (
    <div className="App">
      <div >
        <div className="text-center bg-primary text-white px-3 pt-1 pb-3 display-3">
          Preparation!
        </div>
        <div className="my-4">
          <BrowserRouter >
            <Switch>
              <Route path="/change" component={Change}  />
              <Route path="/home" component={Home}  />
              <Route path="/" component={SignIn}  />
             
            </Switch>

          </BrowserRouter>
        </div>
        </div>  
    </div>
  );
}

export default App;
