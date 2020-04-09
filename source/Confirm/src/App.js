import React from 'react';
import {Route, BrowserRouter as Router } from "react-router-dom";
import Validation from "./Validation"
import ForgotPassword from "./forgotpassword"
import Register from "./register"
import Regenkey from "./regenkey"
import Changkey from "./changekey"
class App extends React.Component {

    render()
    {
      return(
        <Router>
          <Route path = "/validation-key/:id" component={(match)=><Validation match = {match}/>} exact = {false}>
          </Route>
          <Route path = "/forgotpassword/:id" component={(match)=><ForgotPassword match = {match}/>} exact = {false}>
          </Route>
          <Route path = "/register/:id" component={(match)=><Register match = {match}/>} exact = {false}>
          </Route>
          <Route path = "/register-key-again/:id" component={(match)=><Regenkey match = {match}/>} exact = {false}>
          </Route>
          <Route path = "/changekeyvalue/:id" component={(match)=><Changkey match = {match}/>} exact = {false}>
          </Route>
        </Router>
      )
      
    }
}
export default App;