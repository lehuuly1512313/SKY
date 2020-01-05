import React, { Component } from 'react';
import './style.css'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar';
import TableBoxUser from '../../components/TableBoxUser/TableBoxUser';
import RepMailBox from '../../components/RepMailBox/RepMailBox';
import TableBoxKey from '../../components/TableBoxKey/TableBoxKey';

const titleUser = {}, titleMail = {}, titleKey = {}
class AdminPage extends Component {

  routes=[
    {
      path: "/admin/managementuser",
      main: ({match}) => <TableBoxUser match={match} data={this.props.data} title = {titleUser}/>
    },
    {
      path: "/admin/managementkey",
      main: ({match}) => <TableBoxKey match={match} data={this.props.data} title = {titleKey} />
    },
    {
      path: "/admin/managementmail",
      main: ({match}) => <RepMailBox match={match} data={this.props.data} title = {titleMail} />
    }
  ]
  

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <Router>
        <div className = 'admin-page'>
        <SideBar />
        {this.showContentRouter(this.routes)}
        </div>
      </Router>
    );
  }

  showContentRouter=routes => {
    let result=null;
    if (routes.length > 0) {
      result=routes.map((routes, index) => {
        return <Route key={index} path={routes.path} component={routes.main} exact={routes.exact} />;
      });
    }
    return <Switch>{result}</Switch>;
  };
}

 

export default AdminPage