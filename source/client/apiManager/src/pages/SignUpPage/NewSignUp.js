import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
const api=new API();

class NewSignUp extends Component{

  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
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

  handleUsername(e)
  {
    this.setState({laccount: e.target.value});
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
  }

  handlephone(e)
  {
    this.setState({lphone: e.target.value});
  }

  handleinput(e){
    this.setState({recode: e.target.value})
  }



  SignUp = ()=>
  {
    var check = false;
    var {laccount,lpassword,lrepassword,lfullname,lemail,lphone} = this.state;
    Object.entries(this.state.data).map(([key,value],index)=>{
      if(value.account === this.state.laccount)
      {
        check = true;
        return;
      }
    })
    if(check === true){
      alert("tài khoản đã tồn tại");
    }
    else if(!laccount || !lpassword || !lrepassword || !lfullname || !lemail || !lphone) 
    {
      alert("Bạn chưa điền đầy đủ thông tin");
    }
    else if(lpassword!==lrepassword)
    {
      alert("Bạn nhập lại mật khẩu sai! vui lòng kiểm tra lại");
    }
    else if(lpassword.length < 6)
    {
      alert("Mật khẩu phải trên 6 ký tự");
    }
    else if(!lemail.includes("@"))
    {
      alert("Email không đúng định dạng");
    }
    else if(lphone.length < 10 || lphone.length > 11)
    {
      alert("Số điện thoại không hợp lệ");
    }
    else if(laccount.length < 6)
    {
      alert("Tài khoản phải trên 6 ký tự");
    }
    else
    {
    this.setState(
      {
        notifycation: "Check your email",
      }
    )
    var data = {
      msg: "waiting",
      email: this.state.lemail,
    }
    var {laccount,lpassword,lfullname,lemail,lphone} = this.state;
    api.postData(data).then(response =>{
      if(response === "sent") 
      {
      var key = {
          method: "register",
          account: laccount,
          password: lpassword,
          name: lfullname,
          email: lemail,
          phone: lphone,
          avatar: "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg",
          numofbank: ""
      }
      api.postData(key).then(res=>{
        if(res === "successfully")
        {
          this.setState({
            redirect: true
          })
          window.location.reload();
        }
      })
    
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

                  <div className="wrap-input100 validate-input" data-validate="Username is required">
                    <span className="label-input100">Username</span>
                    <input className="input100" type="text" name="username" placeholder="Username must be over 6 characters"  onChange={this.handleUsername} value={this.state.laccount}/>
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
                    <label style={{color: "green"}}>{this.state.notifycation}</label>
                  </div> 
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button className="login100-form-btn" type="button"  onClick={this.SignUp}>
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