import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import API from '../Database/APICnn';
const api=new API();

class ProfilePage extends Component{

  constructor(props) {
    super(props);
    this.handlePassword=this.handlePassword.bind(this);
    this.handleUsername=this.handleUsername.bind(this);
    this.handleLastname=this.handleLastname.bind(this);
    this.handleFirstname=this.handleFirstname.bind(this);
    this.handleoldpassword=this.handleoldpassword.bind(this);
    this.handlenewpassword=this.handlenewpassword.bind(this);
    this.handleconfirmnewpassword=this.handleconfirmnewpassword.bind(this);
    this.handlephone=this.handlephone.bind(this);
    this.handlenumofbank=this.handlenumofbank.bind(this);
    this.edit=this.edit.bind(this);
    this.changeAvatar=this.changeAvatar.bind(this);

    var numofbank="";
    var check=false;
    var id=localStorage.getItem("ID");
    var icon="";
    var color="";
    this.props.data.map(value=>{
      if(id === value.id.toString())
      {
        numofbank=value.numofbank;
        return;
      }
    })

    this.props.banks.map(value=>{
      if(numofbank === value.Cardnum)
      {
        check=true;
        icon= "fa fa-check-circle-o";
        color= "green";
        return;
      }
    })



    this.state={
      laccount :JSON.parse(localStorage.getItem('laccount')) || [],
      lpassword: JSON.parse(localStorage.getItem('lpassword')) || [],
      account: localStorage.getItem('user') || localStorage.getItem('FacebookID') || localStorage.getItem("GoogleID"), 
      first_name: "",
      last_name: "",
      redirect: false,
      data: this.props.data,
      banks: this.props.banks,
      id: 0,
      profile_active: localStorage.getItem("profile"),
      changepassword_active:localStorage.getItem("change"),
      setting_active: localStorage.getItem("setting"),
      handlenewpassword: "",
      handleoldpassword: "",
      handleconfirmnewpassword: "",
      notifycation: "",
      check,
      icon,
      color,
      readOnly: "readOnly"
    };
  }
  componentWillMount() {
       window.scrollTo(0, 0);  
      this.state.data.map(value=>{
        if(value.account === this.state.account)
        {
          var name=value.name.split(" ")
          this.setState({
            ...this.state,
            first_name: name.pop(),
            last_name: name.toString().split(",").join(" "),
            id: value.id,
            phone: value.phone,
            email: value.email,
            avatar: value.avatar,
            numofbank: value.numofbank
          })
          return;
        }
      })
  }
  RenderRedirect=()=>{
    if(this.state.relodirect)
      return <Redirect to='/profile'></Redirect>
  }
  reset=()=>{
    this.setState({
      first_name:"",
      last_name:"",
      phone: "",
      numofbank: ""
    })
  }
    edit=() =>{
      var data={
        id: localStorage.getItem("ID"),
        name: this.state.last_name + " " + this.state.first_name,
        phone: this.state.phone,
        numofbank: this.state.numofbank,
        avatar: this.state.avatar
      }
      console.log(data);
      if(this.state.phone.length < 10 || this.state.phone.length > 11)
      {
        alert("Số điện thoại không đúng định dạng")
      }
      else
      {
      if(this.state.check || this.state.numofbank === "")
      {
        api.putdata(data).then(res=>{
          window.location.reload();
        })
      }
      else
      {
        alert("Chúng tôi không tìm thấy số tài khoản của bạn! xin vui lòng kiểm tra lại");
      }    
    }
}
    handleUsername(e)
    {
      this.setState({laccount: e.target.value});
      console.log(this.state.laccount);
    }

    handlePassword(e)
    {
      this.setState({lpassword: e.target.value});
    }
    handleFirstname(e)
    {
      this.setState({first_name: String(e.target.value)});
      console.log(this.state.first_name);
    }
    handleLastname(e)
    {
      this.setState({last_name: String(e.target.value)});
    }

    handlephone=(e)=>{
      this.setState({phone: e.target.value})
    }

    handlenumofbank=(e)=>{
      this.setState({numofbank: e.target.value})
     
      this.setState({
        icon: "fa fa-times-circle-o",
        color: "red",
        check: false,
      })
      this.state.banks.map(value=>{
        if(e.target.value === value.Cardnum)
        {
          this.setState({
            check:true,
            icon: "fa fa-check-circle-o",
            color: "green"
          })
          return;
        }
      })
    }

    
   
    onChangeHandler=e =>{
    let reader=new FileReader();
    reader.onload=(e) => {
      this.setState({
        avatar: e.target.result
      })
    };
    reader.readAsDataURL(event.target.files[0]);
    }

    profile=()=>{
      this.setState({
        profile_active: "active",
        changepassword_active: null,
        setting_active: null,
      })
    }

    changepassword=()=>{
      this.setState({
        profile_active: null,
        changepassword_active: "active",
        setting_active: null,
      })
    }

    setting=()=>{
      this.setState({
        profile_active: null,
        changepassword_active: null,
        setting_active: "active",
      })
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

    changeAvatar=(e)=>
    {
      this.setState({avatar: e.target.value})
    }

    change=()=>{
      var check=false;
      var id=null;
      this.state.data.map(value=>{
        if(localStorage.getItem("user")=== value.account && this.state.handleoldpassword === value.password)
        {
          check=true;
          id=value.id;
          return;
        }
      })
      if(check)
      {
       if(this.state.handlenewpassword.length < 6)
        {
          alert("Mật khẩu mới phải trên 6 ký tự")
        }
        else if(this.state.handlenewpassword !== this.state.handleconfirmnewpassword)
        {
          alert("Bạn nhập lại mật khẩu không chính xác")
        }
        else
        {
          var data={
            id,
            password: this.state.handlenewpassword
          }
          api.changepassword(data).then(res=>{
            this.setState({
              handleoldpassword: "",
              handlenewpassword: "",
              handleconfirmnewpassword: "",
              notifycation: "Password change successfully"
            })

            setTimeout(() => {
              this.setState({notifycation: ""})
            }, 1500);
          })
        }
      }
      else
      {
        alert("bạn nhập mật khẩu hiện tại không chính xác");
      }
    }

    Re_render=()=>{
      if(this.state.profile_active){
        return(
                        <div className="tab-content">
                <div className="tab-pane active" id="home">
                 
                  <div className="form" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name" ><h4>First name</h4></label>
                        <input type="text" className="form-control"  name="first_name" id="first_name" placeholder="enter your first name" value={this.state.first_name} title="enter your first name if any." onChange={this.handleFirstname} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="last_name" ><h4>Last name</h4></label>
                        <input type="text" className="form-control"   name="last_name" id="last_name" placeholder="enter your last name" value={this.state.last_name} title="enter your last name if any." onChange={this.handleLastname}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="phone" ><h4>Phone</h4></label>
                        <input type="text" className="form-control"  name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." value={this.state.phone} onChange={this.handlephone}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="mobile" ><h4>Card Number</h4></label>
                        
                       
                        <div class="row">
                          <div class="col-sm-10"><input type="text" className="form-control"  name="mobile" id="mobile" placeholder="enter card number" title="enter your mobile number if any." value={this.state.numofbank} onChange={this.handlenumofbank}/></div>
                          <div class="col-sm-2" > <i class={this.state.icon + " " + "fa-3x"} style={{color: this.state.color}} aria-hidden="true"></i></div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="account" ><h4>Username</h4></label>
                        <input type="text" className="form-control"  name="email" id="email" onChange={this.handleUsername} value={this.state.account} readOnly/>
                      </div>
                    </div>
                   
                   
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email" ><h4>email</h4></label>
                        <input type="text" className="form-control"  name="email" id="email"  title="enter your password2." value={this.state.email} readOnly/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12">
                        
                        <label style={{color: "green"}}>{this.state.notifycation}</label>
                        <div>
                        <button className="btn btn-lg btn-success" onClick={this.edit}><i className="glyphicon glyphicon-ok-sign" /> Save</button>
                        <button className="btn btn-lg" type="reset" onClick={this.reset}><i className="glyphicon glyphicon-repeat" /> Reset</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
          </div>
        )
      }
      if(this.state.changepassword_active)
      {
        return(
          <div className="tab-content">
          <div className="tab-pane active" id="home">
           
            <div className="form" id="registrationForm">
            
              <div class="row">
                  <div class="col-sm-6">
                  <label ><h4>Current password</h4></label>
                  <input className="form-control" type="password" minLength="8" name="oldpassword" placeholder="Password must be over 6 characters" id='oldpassword' value={this.state.handleoldpassword} onChange={this.handleoldpassword}/>
                  </div>
                  <div class="col-sm-6">
                  </div>
              </div>

              <div class="row">
                  <div class="col-sm-6">
                  <label ><h4>New password</h4></label>
                  <input className="form-control"  type="password" minLength="8"  name="newpassword" placeholder="Password must be over 6 characters" id='newpassword' value={this.state.handlenewpassword} onChange={this.handlenewpassword}/>
                  </div>
                  <div class="col-sm-6">
                  </div>
              </div>

              <div class="row">
                  <div class="col-sm-6">
                  <label ><h4>Confirm new password</h4></label>
                  <input className="form-control"  type="password" minLength="8" name="confirmnewpassword" placeholder="Password must be over 6 characters" id='confirmnewpassword' value={this.state.handleconfirmnewpassword} onChange={this.handleconfirmnewpassword}/>
                  </div>
                  <div class="col-sm-6">
                  </div>
              </div>
       
              <div className="form-group">
                <div className="col-xs-12">
                  <label style={{color: "green"}}>{this.state.notifycation}</label>
                  <div>
                  <button className="btn btn-lg btn-success" onClick={this.change}><i className="glyphicon glyphicon-ok-sign" />Change</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
    </div>
        )
      }
    }

    render(){
        return(
          <div>
        <div className="container bootstrap snippet">
          <div className="row">
            
           
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="text-center">

                
                <img src={this.state.avatar} className="avatar img-circle img-thumbnail" alt="avatar" />
                <h6>Upload a different photo...</h6>
                <input type="file" className="text-center center-block file-upload" onChange={this.onChangeHandler} webkitRelativePath/>
                <div class="form-group">
                  <label>Your avatar URL</label>
                  <input type="text" class="form-control" name="" id="" aria-describedby="helpId" value={this.state.avatar} onChange={this.changeAvatar}/>
                </div>
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
                <li className={this.state.profile_active} onClick={this.profile} style={{cursor: "pointer"}}><a data-toggle="tab" >Profile</a></li>
                <li className={this.state.changepassword_active} onClick={this.changepassword} style={{cursor: "pointer"}}><a data-toggle="tab" >Change password</a></li>
                <li className={this.state.setting_active} onClick={this.setting} style={{cursor: "pointer"}}><a data-toggle="tab" >Setting</a></li>
              </ul>
              {this.Re_render()}
        </div>{/*/row*/}

      </div>
                </div>
                </div>
        )
    }
        
}

export default ProfilePage;