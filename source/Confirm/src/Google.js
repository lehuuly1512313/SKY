import GoogleLogin from 'react-google-login';
import React,{Component} from 'react';
import './App.css';

import Avatar from 'react-avatar'

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
      IsloggedIn: false,
    }
  }

  responseGoogle = (response) => {
      this.setState({
          userID: response.profileObj.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
          picture: response.profileObj.imageUrl,
          IsloggedIn: true,
      })
  }

  render()
  {    
    var {IsloggedIn, name, email,picture,userID} = this.state;
    let fbcontent;
    if(IsloggedIn)
    {
      fbcontent = (<div>
        <Avatar src = {picture} size = "60" round = {true}></Avatar>
        <p>{name}</p>
        <p>{email}</p>
        <p>{userID}</p>
      </div>);
    }
    else
    {
        fbcontent = (
            <GoogleLogin
            clientId="1060295974592-82oh1am3c9s99qvd2s12rdkgvn437h05.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          )
    }

    return(
      <div>{fbcontent}</div>
    )
  }
}


export default Google;
