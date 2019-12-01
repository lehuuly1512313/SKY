import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {Redirect} from "react-router-dom";
import API from "../Database/APICnn"

const api = new API();


class Facebook extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      userID : '',
      IsloggedIn: true,
      name: '',
      email: '',
      picture: '',
    }
  }

  
  responseFacebook = response =>{
    this.setState({
      IsloggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    })
    localStorage.setItem('email',this.state.email);
    localStorage.setItem('name',this.state.name);
    localStorage.setItem('user',this.state.userID);
    localStorage.setItem('avatar',this.state.picture);
    localStorage.setItem("facebook",true);
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
            <FacebookLogin
            appId="518873332229482"
            fields="name,email,picture"
            callback={this.responseFacebook} 
            cssClass="fb"
            textButton=""
            icon="fa fa-facebook"
            />
          )
    }
    if(localStorage.getItem('FacebookUser'))
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


export default Facebook;
