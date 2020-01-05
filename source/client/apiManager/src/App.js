import React, { Component } from 'react';

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import MenuPage from './components/Menu/Menu'
import TopHeader from './components/TopHeader/TopHeader'
import Footer from "./components/Footer/Footer"
import HomePage from './pages/HomePage/HomePage'
import AdminPage from "./pages/AdminPage/AdminPage";
import Services from "./pages/Services/Services";
import Contacts from "./pages/Contacts/Contacts"
import About from "./pages/About/About"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import CreateKey from "./pages/CreateKey/CreateKey"
import NewSignUp from "./pages/SignUpPage/NewSignUp";
import NewSignIn from "./pages/LoginPage/NewSignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Recreatekey from "./pages/Recreatekey/Recreatekey"
import SDKPage from "./pages/SDKPage/SDKPage"
import Guid from "./pages/Guid/Guid"
import UserMan from "./pages/UserManagement/UserMan"
import KeyMan from "./pages/KeyManagement/KeyMan"
import MailMan from "./pages/MailManagement/MailMan"
import ReplyMail from "./pages/ReplyMail/ReplyMail"

class App extends Component {

  routes=[
    {
      path: "/create-key",
      main: ({match}) => <CreateKey match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/recreatekey",
      main: ({match}) => <Recreatekey match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/dashboard",
      main: ({match,history}) => <Dashboard match={match} history={history} data={this.props.data}/>
    },
    {
      path: "/introduce",
      main: ({match,history}) => <HomePage match={match} history={history} data={this.props.data}/>
    },
    {
      path: "/",
      exact: true,
      main: ({match, history}) => <NewSignIn match={match} history={history} data={this.props.data}/>
    },
    {
      path: "/forgot-password",
      main: ({match, history}) => <ForgetPassword match={match} history={history} data={this.props.data}/>
    },
    {
      path: "/resgister",
      main: ({match}) => <NewSignUp data={this.props.data}/>
    },
    {
      path: "/products",
      main: ({match}) => <Services match={match} data={this.props.data}/>
    },
    {
      path: "/contacts",
      main: ({match}) => <Contacts match={match} data={this.props.data}/>
    },
    {
      path: "/About",
      main: ({match}) => <About match={match} data={this.props.data}/>
    },
    {
      path: "/guid",
      main: ({match}) => <Guid match={match} data={this.props.data}/>
    },
    {
      path: "/profile",
      main: ({match}) => <ProfilePage match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    }
    ,
    {
      path: "/SDK",
      main: () => <SDKPage />
    },
    {
      path: "/UserManagement",
      main: ({match}) => <UserMan  match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/KeyManagement",
      main: ({match}) => <KeyMan  match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/MailManagement",
      main: ({match}) => <MailMan  match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/ReplyMail",
      main: ({match}) => <ReplyMail  match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
    {
      path: "/:id",
      main: ({match}) => <ProfilePage  match={match} data={this.props.data} banks={this.props.banks} names={this.props.names}/>
    },
   

]


  render() {
    var display_user="none";
    var display_top_footer = "none";
    var display_admin = "none";
    var user = localStorage.getItem("user");
    if(user)
    {
      if(user.includes("Admin"))
      {
        display_admin = "block"
        display_top_footer = "block"
      }
      else
      {
        display_user = "block"
        display_top_footer = "block"
      }
    }
    return (
        <Router>
           <TopHeader display={display_top_footer} />
            <MenuPage display={display_user} data={this.props.data}/>
            <AdminPage display={display_admin} data={this.props.data}></AdminPage>
          <div >
          <link  rel="stylesheet" href="./servicesStyle/css/style.css"/>
         
            {this.showContentMenu(this.routes)}
          </div>
          <Footer display={display_top_footer}/>
        </Router>
    );
  }

  showContentMenu=routes => {
    let result=null;
    if (routes.length > 0) {
      result=routes.map((routes, index) => {
        return <Route key={index} path={routes.path} component={routes.main} exact={routes.exact} />;
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default App;