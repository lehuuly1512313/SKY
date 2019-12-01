import GoogleLogin from 'react-google-login';
import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import "./../../App.css"
import API from "../Database/APICnn"

const api = new API();


class Google extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      userID : '',
      name: '',
      email: '',
      picture: '',
      IsloggedIn: true,
    }
  }

  responseGoogle = (response) => {
      this.setState({
          userID: response.profileObj.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
          picture: response.profileObj.imageUrl,
      })
      localStorage.setItem('email',this.state.email);
      localStorage.setItem('name',this.state.name);
      localStorage.setItem('user',this.state.userID);
      localStorage.setItem('avatar',this.state.picture);
      localStorage.setItem("google",true);
      var data = {
        name: this.state.name,
        account: this.state.userID,
        password: "",
        avatar: this.state.picture,
        numofbank: "",
        email: this.state.email,
        phone: "",
      }
      
      api.fbgglogin(data).then(res=>{
        localStorage.setItem('ID',res.id);
        window.location.reload();
      })
  }

  render()
  {    
    var {IsloggedIn} = this.state;
    let fbcontent;
    if(IsloggedIn)
    {
        fbcontent = (
            <GoogleLogin
            clientId="1060295974592-82oh1am3c9s99qvd2s12rdkgvn437h05.apps.googleusercontent.com"
            render={renderProps => (
              <button className="gg" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="./signupstyle/images/google.png"/></button>
            )}
            buttonText="Login With Gooogle"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            
          />
          )
    }

    if(localStorage.getItem('GoogleUser'))
    {
        return <Redirect to='/dashboard'></Redirect>
    }
    else
    {
    return(
        <div>{fbcontent}</div>
        )
    }
  }
}


export default Google;
