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
    localStorage.setItem('FacebookUser',this.state.email);
    localStorage.setItem('FacebookName',this.state.name);
    localStorage.setItem('FacebookID',this.state.userID);
    localStorage.setItem('FacebookPicture',this.state.picture);
    var data = {
      name: this.state.name,
      account: this.state.userID,
      password: "",
      avatar: this.state.picture,
      numofbank: "",
      email: this.state.email,
      phone: "",
    }
    var check = true;
    var id = 0;
    this.props.data.map(value=>{
      if(this.state.userID === value.account)
      {
        check = false;
        id = value.id;
        return true;
      }
    })

    if(check)
    {
      api.facebook_google(data).then(res=>{
        if(res === "sucessfully")
        {
          api.getIDfacebook_google({account: this.state.userID}).then(res=>{
            localStorage.setItem("ID",res[0].id);
            window.location.reload();
          })
        }
      
      })
    }
    else{
      localStorage.setItem("ID",id);
      window.location.reload();
    }
  
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
