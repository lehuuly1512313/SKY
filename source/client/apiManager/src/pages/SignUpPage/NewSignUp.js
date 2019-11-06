import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
const api = new API();

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
    this.handleSelect = this.handleSelect.bind(this);
    this.back = this.back.bind(this);
    this.confirm = this.confirm.bind(this);
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
      redirect:  JSON.parse(localStorage.getItem('redirect')) || false,
      cheackusername: null,
      dataget:this.props.data,
      modal: false,
      code: this.randomkey(),
      recode: "",
      seconds: 10,
      msg: null,
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

  handleSelect(e)
  {
      this.setState({select: e.target.value});
  }

  handleinput(e){
    this.setState({recode: e.target.value})
  }

  s4 = ()=>{
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  randomkey = ()=>
  {
    return this.s4();
  }

  SignUp = ()=>
  {
    var check = false;
    var {laccount,lpassword,lrepassword,lfullname,lemail,lphone} = this.state;
    Object.entries(this.state.dataget).map(([key,value],index)=>{
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
    else
    {

      this.setState({
        seconds: 10
    })
    this.timer = setInterval(()=>{
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds
    });
    if(seconds === 0)
    {
        clearInterval(this.timer);
    }
    }, 1000);
      var data = {
        code: this.state.code,
        email: this.state.lemail,
        contain: "Đây là code của bạn để xác thực tài khoản: "
      }
      api.SendMail(data).then(res=>{
        console.log(res);
        
      })
      this.setState({
        modal: true
      });
    }
  }

  back = ()=>{
    this.setState({
      modal: false
    })
  }

  confirm =  ()=>{
    var {code, recode} = this.state;
    if(code === recode)
    {
      var {laccount,lpassword,lfullname,lemail,lphone} = this.state;
      var datapost = [
        {
          account: laccount,
          password: lpassword,
          name: lfullname,
          email: lemail,
          phone: lphone,
          avatar: "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"
        }
      ]
       Object.entries(datapost).map(([key,val],i)=>{
        api.postData(val).then( response =>{
          localStorage.setItem("move", true)
          window.location.reload();
        })
       
      }) 
      
    }
    else
    {
      alert("mã xác nhận của bạn không chính xác! vui lòng kiểm tra lại email");
    }
  }

  componentWillMount(){
    window.scrollTo(0, 0);
  }

  RenderModal = ()=>{

      const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(24, 23, 23, 0.308)',
        padding: 50
      };
      var notification = null;
      if(this.state.seconds === 0)
      {
        notification = (
          <div><label className = "notification">Check you email and then enter code you recived</label></div>
        )
      }
      else
      {
        notification = (
          <div>
                  <div class="row">
                    <div class="col-sm-6"> <label>{"Please waiting "}<label className = "timer-span">{this.state.seconds}</label></label> <label> for sendMail</label></div>
                  </div>
            </div>
        )
      }
      return(
        <div id="modal-id" style={backdropStyle}>
          <div class="modal-dialog" >
            <div class="modal-content">
              
              <div class="modal-body">
              <span className="login100-form-title p-b-59" style = {{textAlign :"center",fontSize: "20px"}}>
                    Verify your account
              </span>
             {notification}
              <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Your code</span>
                    <input className="input100" type="text" name="name" placeholder="Code..." style = {{fontSize: "20px"}} onChange = {this.handleinput}/>
                    <span className="focus-input100" />
                  </div>
              </div>
              <div class="row" style = {{
                textAlign: "center",
                paddingBottom : "50px"
                }}>
                  {/* {this.RedirectRender()} */}
                <div class="col-sm-6"> <button type="button" class="btn btn-default" style = {{width :"80%", marginTop: "10px"}} onClick = {this.back}>Back</button></div>
                <div class="col-sm-6"><button type="button" class="btn btn-primary" style = {{width :"80%", marginTop: "10px"}} onClick = {this.confirm}>Confirm</button></div>
              </div>
            </div>
          </div>
        </div>
        
      )
  }


    render(){
        if(localStorage.getItem("move"))
        {
        return <Redirect to = '/'></Redirect>
        }
        if(this.state.modal)
        {
          return<div>{this.RenderModal()}</div>
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
                    <input className="input100" type="text" name="name" placeholder="Name..."  onChange = {this.handlefullname} value = {this.state.lfullname}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <span className="label-input100">Email</span>
                    <input className="input100" type="text" name="email" placeholder="Email addess..."  onChange = {this.handlemail} value = {this.state.lemail}/>
                    <span className="focus-input100" />
                  </div><div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <span className="label-input100">Phone</span>
                    <input className="input100" type="text" name="email" placeholder="Phone number..."  onChange = {this.handlephone} value = {this.state.lphone}/>
                    <span className="focus-input100" />
                  </div>

                  <div className="wrap-input100 validate-input" data-validate="Username is required">
                    <span className="label-input100">Username</span>
                    <input className="input100" type="text" name="username" placeholder="Username..."  onChange = {this.handleUsername} value = {this.state.laccount}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Password</span>
                    <input className="input100" type="password" name="pass" placeholder="*************"  onChange = {this.handlePassword} value = {this.state.lpassword}/>
                    <span className="focus-input100" />
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Repeat Password is required">
                    <span className="label-input100">Repeat Password</span>
                    <input className="input100" type="password" name="repeat-pass" placeholder="*************"  onChange = {this.handleUConfirmPassword} value = {this.state.lrepassword}/>
                    <span className="focus-input100" />
                  </div>   
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button className="login100-form-btn" type = "button"  onClick = {this.SignUp}>
                        Continue
                      </button>
                    </div>
                    <Link to ="/" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
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