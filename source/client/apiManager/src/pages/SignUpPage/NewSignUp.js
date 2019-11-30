import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
const api=new API();

class NewSignUp extends Component{

  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUConfirmPassword = this.handleUConfirmPassword.bind(this);
    this.handlefullname = this.handlefullname.bind(this);
    this.handlemail = this.handlemail.bind(this);
    this.handlephone = this.handlephone.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.handleinput = this.handleinput.bind(this);
    this.timer = 0;
    
    this.state = {
      laccount :JSON.parse(localStorage.getItem('laccount')) || null,
      lpassword: JSON.parse(localStorage.getItem('lstate')) || null,
      lrepassword: JSON.parse(localStorage.getItem('lstate')) || null,
      lfullname: null,
      lemail: null,
      lphone: null,
      select: "Email",
      redirect:  false,
      cheackusername: null,
      data:this.props.data,
      notifycation: ""
    };
  }

  handlePassword(e)
  {
    this.setState({lpassword: e.target.value});
  }

  handleUConfirmPassword(e)
  {
    this.setState({lrepassword: e.target.value});
  }

  handlefullname(e)
  {
    this.setState({lfullname: e.target.value});
  }

  handlemail(e)
  {
    this.setState({lemail: e.target.value});
    this.setState({laccount: e.target.value});
  }

  handlephone(e)
  {
    this.setState({lphone: e.target.value});
  }

  handleinput(e){
    this.setState({recode: e.target.value})
  }


  RenderModalViewClick=()=>{
    const backdropStyle={
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(24, 23, 23, 0.308)',
      padding: 50
    };
    return(     
      <div  class="modal fade" id="modal-id" style={backdropStyle}>
        <div class="modal-dialog" >
          <div class="modal-content">
            
            <div class="modal-body">
              <div style={{
                    textAlign: "center",
                    fontSize: "30px",
                    padding: "10px"
                    }}>
                   Notification
              </div>
            <span style={{textAlign :"center",fontSize: "30px",color: "green",paddingBottom : "50px"}}>
              {this.state.notifycation}
            </span>
            <div class="row" style={{
                    textAlign: "center",
                    paddingBottom : "10px"
              
                    }}>
                      <div class="col-sm-6"></div>
                    <div class="col-sm-6"> <button type="button" class="btn btn-default" style={{width :"80%", marginTop: "10px"}} onClick={this.back} data-dismiss="modal">ok</button></div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    )
}


  SignUp = ()=>
  {
    var check = false;
    var {lpassword,lrepassword,lfullname,lemail,lphone} = this.state;
    Object.entries(this.state.data).map(([key,value],index)=>{
      if(value.account === this.state.laccount)
      {
        check = true;
        return true;
      } 
    })
    var notifycation = "";
    if(check === true){
       notifycation = "Account already exists"
       this.setState(
        {
          notifycation
        }
      )
    }
    else if(!lpassword || !lrepassword || !lfullname || !lemail || !lphone) 
    {
      notifycation = "You have not filled in the information"
      this.setState(
        {
          notifycation
        }
      )
    }
    else if(lpassword!==lrepassword)
    {
      notifycation = "You entered the wrong password again! please check again";
      this.setState(
        {
          notifycation
        }
      )
    }
    else if(lpassword.length < 6)
    {
      notifycation = "Password must be over 6 characters";
      this.setState(
        {
          notifycation
        }
      )
    }
    else if(!lemail.includes("@"))
    {
      notifycation = "Email invalidate";
      this.setState(
        {
          notifycation
        }
      )
    }
    else if(lphone.length < 10 || lphone.length > 11)
    {
      notifycation ="invalid phone number";
      this.setState(
        {
          notifycation
        }
      )
    }
    else
    {
      notifycation = "please check your mail to active account"
    this.setState(
      {
        notifycation
      }
    )
    var data = {
      msg: "send-mail",
      email: this.state.lemail,
    }
    localStorage.setItem("account", lemail)
    var {laccount,lpassword,lfullname,lemail,lphone} = this.state;
    api.postData(data).then(res=>{
      if(res === "sent")
      {
        var set = setInterval(()=>{
          var data2 = {
            msg: "waiting"
          }
          api.postData(data2).then(res=>{
            if(res === "done")
              {
                clearInterval(set);
                var key = {
                  msg: "register",
                  account: lemail,
                  password: lpassword,
                  name: lfullname,
                  email: lemail,
                  phone: lphone,
                  avatar: "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg",
                  numofbank: ""
              }
                api.postData(key).then(res=>{
                  this.setState({
                    redirect: true
                  })
                  localStorage.clear();
                  window.location.reload();
                })
              }
          })
        },2000)
      }
    })
    }
  }

    render(){
      if(this.state.redirect)
      {
        return <Redirect to='/'></Redirect>
      }
        return(
          <div>
            {this.RenderModalViewClick()}
            <div className="limiter">
            <div className="container-login100">
              <div className="login100-more" style={{backgroundImage: 'url("./signupstyle/images/signup.jpg")'}} />
              <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-59">
                    Sign Up
                  </span>
                  <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Full Name</span>
                    <input className="input100" type="text" name="name" placeholder="Name..."  onChange={this.handlefullname} value={this.state.lfullname}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <span className="label-input100">Email</span>
                    <input className="input100" type="email" name="email" placeholder="abc@xyz.pqm"  onChange={this.handlemail} value={this.state.lemail}/>
                    <span className="focus-input100" />
                  </div><div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <span className="label-input100">Phone</span>
                    <input className="input100" type="number"  maxLength="11" name="quantity" min="0" max="9" placeholder="08xxxxxxx"  onChange={this.handlephone} value={this.state.lphone}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Password</span>
                    <input className="input100" type="password" name="pass" minLength="8" placeholder="Password must be over 6 characters"  onChange={this.handlePassword} value={this.state.lpassword}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Repeat Password is required">
                    <span className="label-input100">Repeat Password</span>
                    <input className="input100" type="password" name="repeat-pass" minLength="8" placeholder="Password must be over 6 characters"  onChange={this.handleUConfirmPassword} value={this.state.lrepassword}/>
                    <span className="focus-input100" />
                  </div>  
                  <div>
                   
                  </div> 
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button className="login100-form-btn" type="button"  onClick={this.SignUp} data-toggle="modal" href='#modal-id'>
                        Continue
                      </button>
                    </div>
                    <Link to="/" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                      Sign In
                      <i className="fa fa-long-arrow-right m-l-5" />
                    </Link>
                  </div>
                </form>
              </div>

              
             </div>
            </div>
          </div>
        )
    }
}


export default NewSignUp;