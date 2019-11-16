import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
const api=new API();

class SignUpPage extends Component{

  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleUConfirmPassword = this.handleUConfirmPassword.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.state = {
      laccount :JSON.parse(localStorage.getItem('laccount')) || null,
      lpassword: JSON.parse(localStorage.getItem('lstate')) || null,
      lrepassword: JSON.parse(localStorage.getItem('lstate')) || null,
      redirect:  JSON.parse(localStorage.getItem('redirect')) || false,
      cheackusername: null,
      dataget:[]
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

  componentWillMount()
  {
    api.getData().then(response => {
      console.log('Data fetched', response)
      this.setState({
        dataget: response
      })
    })
  }
  
  SignUp = ()=>
  {
    var check = false;
    var {laccount,lpassword,lrepassword} = this.state;
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
    else if(!laccount || !lpassword || !lrepassword) 
    {
      alert("Bạn chưa điền đầy đủ thông tin");
    }
    else if(lpassword!==lrepassword)
    {
      alert("Bạn nhập lại mật khẩu sai! vui lòng kiểm tra lại");
    }
    else
    {
      var datapost = [
        {
          account: laccount,
          password: lpassword,
          name: "Lê Hữu Lý",
          avatar: "avatar n"
        }
      ]
      Object.entries(datapost).map(([key,val],i)=>{
        api.postData(val).then(response =>{
          alert("Đăng ký thành công! bạn sẽ được chuyển hướng sang trang đăng nhập");
          this.setState({
            redirect : true,
          },() => {
            localStorage.setItem('redirect', JSON.stringify(this.state.redirect
            ))
          });
        })
      })
      
     

    }
  }

  RedirectRender = ()=>{
 
    if(this.state.redirect)
    {
      return <Redirect to='/'></Redirect>
    }
  }
    render(){

   
        return(
          <div>
                <link rel="stylesheet" type="text/css" href="./loginStyle/css/main.css"></link>
        <div className="limiter">
          <div className="container-login100" style={{backgroundImage: 'url("loginStyle/images/bg-01.jpg")'}}>
            <div className="wrap-login100 p-l-110 p-r-110 p-t-37 p-b-33">
              <form className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-34">
                  Sign Up
                </span>
                
                <div className="p-t-7 p-b-9">
                  <span className="txt1" >
                    Username
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Username is required">
                  <input className="input" type="text" name="username"   onChange={this.handleUsername}/>
                  <span className="focus-input100" />
                </div>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">
                    Password
                 </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Username is required">
                  <input className="input" type="text" name="username"   onChange={this.handleUsername}/>
                  <span className="focus-input100" />
                </div>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">
                    Password
                 </span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Username is required">
                  <input className="input" type="text" name="username"   onChange={this.handleUsername}/>
                  <span className="focus-input100" />
                </div>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">
                    Password
                 </span>
                </div>

                
                
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input className="input" type="password" name="pass"  onChange={this.handlePassword}/>
                  <span className="focus-input100" />
                </div>

                <div className="p-t-18 p-b-10">
                  <span className="txt1">
                    Confirm Password
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input className="input" type="password" name="pass"  onChange={this.handleUConfirmPassword}/>
                  <span className="focus-input100" />
                </div>

                
                <a class="btn btn-primary">Trigger modal</a>
                <div class="modal fade" id="modal-id">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Modal title</h4>
                      </div>
                      <div class="modal-body">
                        
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                

                <div className="container-login100-form-btn m-t-17">
                  {this.RedirectRender()}
                  <button className="login100-form-btn" onClick={this.SignUp} type="button"  data-toggle="modal" href='#modal-id'>
                    Sign Up
                  </button>
                </div>
                <div className="w-full text-center p-t-28">
                  <span className="txt2">
                    Ready Account??
                  </span>
                  <Link to="/login" className="txt2 bo1">
                    Login Now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
        )
    }
}


export default SignUpPage;