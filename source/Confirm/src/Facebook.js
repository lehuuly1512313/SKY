import React,{Component} from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Avatar from 'react-avatar'


class Facebook extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      userID : '',
      IsloggedIn: false,
      name: '',
      email: '',
      picture: '',
    }
  }

  componentClicked = () => {
    console.log('click');
  }


  responseFacebook = response =>{
    this.setState({
      IsloggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })

    console.log(response);
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
        <FacebookLogin
        appId="518873332229482"
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />
      )
    }

    return(
      <div>{fbcontent}</div>
    )
  }
}


export default Facebook;
