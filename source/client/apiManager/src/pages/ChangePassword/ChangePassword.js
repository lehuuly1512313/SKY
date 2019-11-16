import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import API from '../Database/APICnn';
const api=new API();




class ChangePassword extends Component{
  
    constructor(props) {
      super(props);
      this.handleoldpassword = this.handleoldpassword.bind(this);
      this.handlenewpassword = this.handlenewpassword.bind(this);
      this.handleconfirmnewpassword = this.handleconfirmnewpassword.bind(this);
      this.state = {
        account :JSON.parse(localStorage.getItem('laccount')) || [],
        email: JSON.parse(localStorage.getItem('lemail')) || [],
        redirect: false,
        data: this.props.data,
        notifycation: "",
        handlenewpassword: "",
        handleoldpassword: "",
        handleconfirmnewpassword: ""
      };
    }

    componentWillMount(){
      window.scrollTo(0, 0);
    }

    handleoldpassword(e)
    {
      e.preventDefault();
      this.setState({handleoldpassword: e.target.value});
    }

    handlenewpassword(e)
    {
      e.preventDefault();
      this.setState({handlenewpassword: e.target.value});
    }

    handleconfirmnewpassword(e)
    {
      e.preventDefault();
      this.setState({handleconfirmnewpassword: e.target.value});
    }

    signIn = () =>{

      // check email

    //   var check = false;

    //   this.state.data.map(value=>{
    //     if(value.email === this.state.email && value.account === this.state.account)
    //     {
    //         check = true;
    //     }
    //   })

    //   if(check)
    //   {
    //   this.setState(
    //     {
    //       notifycation: "Check your email",
    //     }
    //   )
    //   var data = {
    //     msg: "waiting",
    //     email: this.state.email,
    //   }

    //   var id = 0;
    //   this.state.data.map(value=>{
    //     if(this.state.account === value.account)
    //     {
    //       id = value.id;
    //     }
    //   })
    //   api.forgotpassword(data).then(response =>{
    //     if(response === "sent") 
    //     {
    //     var key = {
    //         method: "forgot-password",
    //         id
    //     }
    //     api.forgotpassword(key).then(res=>{
    //       if(res === "successfully")
    //       {
    //         this.setState({
    //           redirect: true
    //         })

    //         window.location.reload();
    //       }
    //     })
      
    //   }
    //   })    
    // }
    // else{
    //   alert("email hoặc tài khoản của bạn không chinhs xác");
    // }
    }

    render(){
      if(this.state.redirect)
      {
        return <Redirect to='/'></Redirect>
      }
        return(
          //   <div>
          //   <div className="limiter">
          //   <div className="container-login100">
          //     <div className="login100-more" style={{backgroundImage: 'url("./signupstyle/images/signup.jpg")'}} />
          //     <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
          //       <form className="login100-form validate-form">
          //         <span className="login100-form-title p-b-59">
          //           Change Password
          //         </span>
                  
          //         <div className="wrap-input100 validate-input" data-validate="Username is required">
          //           <span className="label-input100">current password</span>
          //           <input className="input100" type="password" name="oldpassword" placeholder="Old password..." name="oldpassword" id = 'oldpassword' onChange = {this.handleoldpassword}/>
          //           <span className="focus-input100" />
          //         </div>
          //         <div className="wrap-input100 validate-input" data-validate="Password is required">
          //           <span className="label-input100">New password</span>
          //           <input className="input100" type="password" name="newpassword" placeholder = "New password..." id = 'newpassword' onChange = {this.handlenewpassword}/>
          //           <span className="focus-input100" />
          //         </div>

          //         <div className="wrap-input100 validate-input" data-validate="Password is required">
          //           <span className="label-input100">Confirm new password</span>
          //           <input className="input100" type="password" name="confirmnewpassword" placeholder = "New password..." id = 'confirmnewpassword' onChange = {this.handleconfirmnewpassword}/>
          //           <span className="focus-input100" />
          //         </div>

          //         <div>
          //           <label style = {{color: "green"}}>{this.state.notifycation}</label>
          //         </div>

          //         <div className="container-login100-form-btn">
          //           <div className="wrap-login100-form-btn">
          //             <div className="login100-form-bgbtn" />
          //             <button className="login100-form-btn" type = "button" onClick = {this.signIn}>
          //               Confirm
          //             </button>
          //           </div>
          //           <Link to ="/" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
          //             Way back dashboard
          //             <i className="fa fa-long-arrow-right m-l-5" />
          //           </Link>
          //         </div>
          //       </form>
          //     </div>
          //   </div>
          // </div>
          // </div>
          <div>
      
        <div className="container bootstrap snippet">
          <div className="row">
            
           
          </div>
          <div className="row">
            <div className="col-sm-3">

            <div className="panel panel-default">
                <div className="panel-heading">Website <i className="fa fa-link fa-1x" /></div>
                <div className="panel-body"><Link to="/">SoundAPI.com</Link></div>
              </div>
              
              <div className="panel panel-default">
                <div className="panel-heading">Website <i className="fa fa-link fa-1x" /></div>
                <div className="panel-body"><Link to="/">SoundAPI.com</Link></div>
              </div>
             
              <div className="panel panel-default">
                <div className="panel-heading">Social Media</div>
                <div className="panel-body">
                  <i className="fa fa-facebook fa-2x" /> <i className="fa fa-github fa-2x" /> <i className="fa fa-twitter fa-2x" /> <i className="fa fa-pinterest fa-2x" /> <i className="fa fa-google-plus fa-2x" />
                </div>
              </div>
            </div>{/*/col-3*/}
            <div className="col-sm-9">
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#home">Change password</a></li>
                
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <div className="form" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name" ><h4>First name</h4></label>
                        <input type="text" className="form-control"  name="first_name" id="first_name"  value={this.state.first_name} title="enter your first name if any." onChange={this.handleFirstname} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="last_name" ><h4>Last name</h4></label>
                        <input type="text" className="form-control"   name="last_name" id="last_name" value={this.state.last_name} title="enter your last name if any." onChange={this.handleLastname}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="phone" ><h4>Phone</h4></label>
                        <input type="text" className="form-control"  name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." value={this.state.phone}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="mobile" ><h4>Card Number</h4></label>
                        <input type="text" className="form-control"  name="mobile" id="mobile" placeholder="enter card number" title="enter your mobile number if any." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="account" ><h4>Username</h4></label>
                        <input type="text" className="form-control"  name="email" id="email" onChange={this.handleUsername} value={this.state.account}/>
                      </div>
                    </div>
                   
                   
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email" ><h4>email</h4></label>
                        <input type="text" className="form-control"  name="email" id="email"  title="enter your password2." value={this.state.email}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        {this.RenderRedirect}
                        <button className="btn btn-lg btn-success" onClick={this.edit}><i className="glyphicon glyphicon-ok-sign" /> Save</button>
                        <button className="btn btn-lg" type="reset" onClick={this.reset}><i className="glyphicon glyphicon-repeat" /> Reset</button>
                      </div>
                    </div>
                  </div>
                 
                </div>{/*/tab-pane*/}
                
          </div>{/*/col-9*/}
        </div>{/*/row*/}

      </div>
                </div>
                </div>
        )
    }
}


export default ChangePassword;