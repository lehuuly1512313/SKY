import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
import Facebook from './Facebook';
import Google from './Google'
const api=new API();




class NewSignIn extends Component{
  
    constructor(props) {
      super(props);
      this.handlePassword=this.handlePassword.bind(this);
      this.handleUsername=this.handleUsername.bind(this);
      this.handleAdminPublicKey = this.handleAdminPublicKey.bind(this);
      this.signIn=this.signIn.bind(this);
      this.state={
        laccount :JSON.parse(localStorage.getItem('laccount')) || [],
        lpassword: JSON.parse(localStorage.getItem('lstate')) || [],
        redirect: false,
        data: this.props.data,
        notifycation: "",
        src: "none",
        Admin: false,
        admin_public_key: "",
      };
    }

    componentWillMount(){
      window.scrollTo(0, 0);
    }

    handleUsername(e)
    {
      e.preventDefault();
      this.setState({laccount: e.target.value});
      if(e.target.value.includes("Admin"))
      {
        this.setState({
          Admin: true
        })
      }
      else
      {
        this.setState({
          Admin: false
        })
      }
    }

    handleAdminPublicKey(e)
    {
      this.setState({admin_public_key: e.target.value})
    }

    handlePassword(e)
    {
      e.preventDefault();
      this.setState({lpassword: e.target.value});
    }

    signIn=() =>{
      var id=null;
      var notifycation = "";
      if(this.state.laccount.includes('Admin'))
      {
      this.setState({
        src: 'block',
      })
      if(this.state.laccount === localStorage.getItem("account")){
        notifycation = "Please check your email to activate your account";
        this.setState({
          notifycation,
          src: 'none'
        })
      }
      else
      {
        this.setState({
        src: 'block'
      })

        var data = {
          account: this.state.laccount,
          password: this.state.lpassword,
          admin_public_key: this.state.admin_public_key
        }
        api.login_admin(data).then(res=>{
          if(res.account)
          {
            id = res.id;
            this.setState({
              laccount: this.state.laccount,
              redirect : true,
              lpassword: this.state.lpassword,
              lstate: this.state.lstate,
              rec:true
            },() => {
              localStorage.setItem('user', this.state.laccount)
            });
            localStorage.setItem("logged", true);
            localStorage.setItem("ID", id);
            localStorage.setItem("name", res.name);
            localStorage.setItem("avatar", "https://d29jd5m3t61t9.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m.png");
            window.location.reload();
          }
          else
          {
            notifycation = res;
            this.setState({
              notifycation,
              src:'none'
            })
          }
          
          setTimeout(() => {
            this.setState({notifycation: ""})
          }, 3000);
        })
      }

      }
      else
      {
      this.setState({
        src: 'block',
      })
      if(this.state.laccount === localStorage.getItem("account")){
        notifycation = "Please check your email to activate your account";
        this.setState({
          notifycation,
          src: 'none'
        })
      }
      else
      {
        this.setState({
        src: 'block'
      })

        var data = {
          account: this.state.laccount,
          password: this.state.lpassword,
        }
        api.login(data).then(res=>{
          if(res.account)
          {
            id = res.id;
            this.setState({
              laccount: this.state.laccount,
              redirect : true,
              lpassword: this.state.lpassword,
              lstate: this.state.lstate,
              rec:true
            },() => {
              localStorage.setItem('user', this.state.laccount)
            });
            localStorage.setItem("logged", true);
            localStorage.setItem("ID", id);
            localStorage.setItem("name", res.name);
            localStorage.setItem("avatar", res.avatar);
            localStorage.setItem("phone",res.phone);
            window.location.reload();
          }
          else
          {
            notifycation = res;
            this.setState({
              notifycation,
              src:'none'
            })
          }
          
          setTimeout(() => {
            this.setState({notifycation: ""})
          }, 3000);
        })
      }

    }
  }

  
    

    render(){
      var logout=localStorage.getItem('logout');
      var admin_public_key = null;
      if(this.state.Admin)
      {
        admin_public_key = (
          <div className="wrap-input100 validate-input" data-validate="Username is required">
          <span className="label-input100">Admin public key</span>
          <input className="input100" type="text" name="username" placeholder="Username..."  id='account' onChange={this.handleAdminPublicKey}/>
          <span className="focus-input100" />
        </div>
        )
      }
      if(localStorage.getItem("move"))
      {
        localStorage.removeItem("move");
      }
      if(logout)
      {
        localStorage.clear();
        window.location.reload();
      }
      if(localStorage.getItem('user'))
      {
        if(localStorage.getItem('user').includes("Admin"))
        {
          return <Redirect to='/UserManagement'></Redirect>
        }
        else return <Redirect to='/dashboard'></Redirect>
      }
      else{
        return(
            <div>
            <div className="limiter">
            <div className="container-login100">
              <div className="login100-more" style={{backgroundImage: 'url("./signupstyle/images/signup.jpg")'}} />
              <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-59">
                    Sign In
                  </span>
                  <img src={"https://retchhh.files.wordpress.com/2015/03/loading4.gif?w=300&h=300"} alt="loading..." style={{width: "20px", height: "20px",display:`${this.state.src}`}}/>
                  <label style={{color: "green", fontSize :'25px'}}>{this.state.notifycation}</label>
                  <div className="wrap-input100 validate-input" data-validate="Username is required">
                    <span className="label-input100">Username</span>
                    <input className="input100" type="text" name="username" placeholder="Username..."  id='account' onChange={this.handleUsername}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Password</span>
                    <input className="input100" type="password" name="pass" placeholder="*************" id='password' onChange={this.handlePassword}/>
                    <span className="focus-input100" />
                  </div>  
                  {admin_public_key}
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button className="login100-form-btn" type="button" onClick={this.signIn}>
                        Sign In
                      </button>
                      
                    </div>
                    <Link to="/resgister" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                      Sign Up
                      <i className="fa fa-long-arrow-right m-l-5" />
                    </Link>
                    
                    <div className="fbgg">
                        
                        <div class="row">   
                            <div class="col-sm-8"> <span className="label-input100">Or sign in with</span> </div>
                            <div class="col-sm-2">
                                <Facebook data={this.props.data}></Facebook>
                            
                            </div>
                            <div class="col-sm-2">
                                <Google data={this.props.data}></Google>
                            
                            </div>
                        </div>
                        
                    </div>

                    <div style={{textAlign: "center"}}>
                    <div class="col-sm-12"> <Link to="/forgot-password"  className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                        Forgot password
                      <i className="fa fa-long-arrow-right m-l-5" />
                    </Link></div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        )
    }
  }
}


export default NewSignIn;