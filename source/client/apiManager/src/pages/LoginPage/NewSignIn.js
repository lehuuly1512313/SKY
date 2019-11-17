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
      this.signIn=this.signIn.bind(this);
      this.state={
        laccount :JSON.parse(localStorage.getItem('laccount')) || [],
        lpassword: JSON.parse(localStorage.getItem('lstate')) || [],
        redirect: false,
        data: this.props.data
      };
    }

    componentWillMount(){
      window.scrollTo(0, 0);
    }

    handleUsername(e)
    {
      e.preventDefault();
      this.setState({laccount: e.target.value});
    }

    handlePassword(e)
    {
      e.preventDefault();
      this.setState({lpassword: e.target.value});
    }

    signIn=() =>{
      var check='0';
      var id=null;
      Object.entries(this.state.data).map(([key,value],i) =>{
        if(value.account === this.state.laccount && value.password === this.state.lpassword)
        {
          check='1';
          id=value.id;
          return;
        }
      })
      if(check === '0')
        alert("đăng nhập thất bại! tài khoản hoặc mật khẩu không chính xác");
      else
        {
          console.log("đăng nhập thành công");
        
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
        window.location.reload();
        }
  }

  
    

    render(){
      var logout=localStorage.getItem('logout');
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
        return <Redirect to='/dashboard'></Redirect>
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