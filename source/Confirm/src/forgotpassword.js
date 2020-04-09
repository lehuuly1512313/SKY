import React from 'react';
import axios from 'axios' ;

const localhost = "http://localhost:4000/";
const herokuhost = 'http://back-end-services-soa.herokuapp.com/'
class forgotpassword extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.handlepassword = this.handlepassword.bind(this);
    this.handleconfirmpassword = this.handleconfirmpassword.bind(this);
    this.state= {
      data: "",
      loading: true,
      key: "",
      password: "",
      confirmpassword: ""
    }
  }

  post = ()=>{
    axios.post(`${localhost}validation`,
    {
      msg: "sucessfully",
      password: this.state.password
    })
    .then(res=>{
     this.setState({
       data: res.data,
       loading: false
     })
     setTimeout(()=>{
      window.close();
    },1000)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  get = ()=>{
      axios.get(`${localhost}check-validation`)
      .then(res=>{
          this.setState({
              key: res.data
          })
          var {match} = this.props;
          if(this.state.key === match.match.params.id)
          {
            this.post();
          
          }
          
      })
      .catch(err=>{
        console.log(err);
      })
  }

  handlepassword = (e)=>{
    this.setState({
      password: e.target.value
    })
  }

  handleconfirmpassword = (e)=>{
    this.setState({
      confirmpassword: e.target.value
    })
  }

  validation = ()=>{
    if(this.state.password.length < 6)
    {
      alert("Mật khẩu phải trên 6 ký tự");
    }
    else if(this.state.password !== this.state.confirmpassword)
    {
      alert("Nhập lại mật khẩu không chính xác");
    }
    else
    {
      this.get();
    }
  }

    render()
    {
      var notifycation = null;
      if(this.state.loading)
      {
        return(
        
          // <form class="navbar-form pull-right form-reset" >
          //   <div>
          //     <h2>Reset you password</h2>
          //   </div>
          //   <div >
          //   <div class="row" >
          //        <div class="col-sm-2"><label>New Password:</label></div>
          //        <div class="col-sm-2"> <input type="password" style={{width: "200px"}} onChange = {this.handlepassword}/></div>
          //   </div>  
          //   </div>
          //   <div>
          //   <div class="row">
          //        <div class="col-sm-2"><label>Confirm Password:</label></div>
          //        <div class="col-sm-2"> <input type="password" style={{width: "200px"}} onChange = {this.handleconfirmpassword}/></div>
          //   </div> 
          //   </div>
          //   <div>          
          //   
          //    </div>
          // </form>
          <div  id="modal-id">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" >
               <div style = {{textAlign: "center"}}> <h4>Reset your password</h4></div>
              </div>
              <div class="modal-body">
                 <label>New Password:</label>
                <div style = {{textAlign: "center"}}><input type="password" className = "input-type" onChange = {this.handlepassword} placeholder = "Password must be over 6 characters"/></div>
            
                  <div ><label>Confirm Password:</label></div>
                  <div style = {{textAlign: "center"}}> <input type="password" className = "input-type" onChange = {this.handleconfirmpassword} placeholder = "Password must be over 6 characters"/></div> 

             </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick = {this.validation}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
         
          
        )        
      }
      else
      {
        notifycation = (<label>Đang tiến hành thay đặt lại mật khẩu....</label>)
        return(
          <div style = {{textAlign: "center", marginTop: "250px"}}>
            <img src={"https://thumbs.gfycat.com/ObviousQuarrelsomeIntermediateegret-max-1mb.gif"} alt="loading..." style = {{width: "20px", height: "20px"}}/>{notifycation}
          </div>
        )
        
      }
    }
}
export default forgotpassword;