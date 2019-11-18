import React, {Component} from "react";
import API from './../../pages/Database/APICnn';
import '../../App.css';
import {Redirect} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const api=new API();
class Recreatekey extends Component{

  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.dashboard = this.dashboard.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handlebank = this.handlebank.bind(this);
    this.inputcard = this.inputcard.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

    var Country = "Vietnam";
    var Bank =  "Vietcombank";
    var numofbank = "";
    var bankid = 0;
    var check = "";
    var id = localStorage.getItem("ID");
    this.props.data.map(value=>{
      if(id === value.id.toString())
      {
        numofbank = value.numofbank;
        if(numofbank)
        {  check = "Corect";}
        return true;
      }
    })
    console.log(numofbank);
    this.props.banks.map(value=>{
      if(numofbank === value.Cardnum)
      {
        Country = value.Country;
        Bank = value.Name;
        bankid = value.id;
        return true;
      }
    })

    this.state = {
      maccount :JSON.parse(localStorage.getItem('laccount')) || '',
      mpassword: JSON.parse(localStorage.getItem('lpassword')) || '',
      user: localStorage.getItem('user'),
      facebookuser: localStorage.getItem('FacebookUser'),
      googleuser: localStorage.getItem("GoogleUser"),
      data: this.props.data,
      banks: this.props.banks,
      names: this.props.names,
      key: "yourkey",
      copied: false,
      name : "",
      select: "1 Month",
      Country,
      Bank,
      check,
      card: "",
      color:"green",
      modal: "",
      company: "",
      phone: "",
      bankid,
      keyvalue: "",
      keystatus: "",
      notifycation: "",
    };
  }

  async componentWillMount() {
    window.scrollTo(0, 0);
    if(localStorage.getItem("user") || localStorage.getItem("FacebookUser") || localStorage.getItem("GoogleUser")) 
    {
      var user = localStorage.getItem("user");
      if(localStorage.getItem("FacebookUser"))
      {
        user = localStorage.getItem("FacebookID");
      }
      if(localStorage.getItem("GoogleUser"))
      {
        user = localStorage.getItem("GoogleID");
      }
      await this.state.data.map(value=>{
        if(value.account === user)
        {
          this.setState({
            ...this.state,
            name: value.name,
            email: value.email,
            phone: value.phone,
            card: value.numofbank
          })
          return true;
        }
      })

      var data = {};
        if(localStorage.getItem("ID"))
        {
            data = {id: localStorage.getItem("ID")}
        }
      await api.getKey(data).then(res=>{
        res.map(value=>{
          if(value.id.toString() === localStorage.getItem("keyID"))
          {
            this.setState({
              keyvalue: value.value,
              keystatus: value.status,
            })
          }
        })
        
      })
  }
  }



  handleCompany = (e)=>{
    this.setState({company: e.target.value})
  }

  handlePhone = (e)=>{
    this.setState({phone: e.target.value})
  }

  inputcard = (e)=>{
    this.setState({
      card: e.target.value
    })
    this.setState({
      check: ""
    })
    this.state.banks.map(value=>{
      if(e.target.value === value.Cardnum && value.Name === this.state.Bank)
      {
        this.setState({
          check: "Corect",
          bankid: value.id,
        })
        return true;
      }
    })  
  }

  handleSelect(e)
  {
    this.setState({select: e.target.value});

  }

  handleCountry(e)
  {
    this.setState({Country: e.target.value});
    if(e.target.value === "Nation")
    {
      this.setState({Bank: "Mastercard"});
    }
    else
    {
      this.setState({Bank: "Vietcombank"});
    }
  }

  handlebank(e)
  {
    this.setState({
      Bank: e.target.value,
      check: ""
    });
    this.state.banks.map(value=>{
      if(this.state.card === value.Cardnum && value.Name === e.target.value)
      {
        this.setState({
          check: "Corect"
        })
        return true;
      }
    })  
  }

create = async () =>{
  var userid = "";
  if(await localStorage.getItem("ID")){
    userid = localStorage.getItem("ID");
  }
  if(this.state.card && this.state.check === "Corect")
  {
  var data = {
    msg: "waiting",
    email: this.state.email,
  }


  this.setState({
    notifycation: "Check your email"
  })
  api.Recreatekey(data).then(response =>{
    
    if(response === "sent") 
    {     
    var cost = 0;
    if(this.state.select === "1 Month")
    {
      cost = 1
    }
    if(this.state.select === "3 Months")
    {
      cost = 3
    }
    if(this.state.select === "6 Months")
    {
      cost = 5
    }
    if(this.state.select === "9 Months")
    {
      cost = 7
    }
    if(this.state.select === "12 Months")
    {
      cost = 9
    }
    if(this.state.select === "Unlimited")
    {
      cost = 0
    }
    var key = {
        method: "register-again",
        id: localStorage.getItem("keyID"),
        type: this.state.select,
        card: this.state.bankid,
        cost,
        email: this.state.email,
    }
    api.Recreatekey(key).then(res=>{
      if(res === "sucessfully")
      {
        localStorage.setItem("dashboard" , true);
        window.location.reload();
      }
    })
  }
  })
}
}


loadBanks = (data)=>{
 return data.map(value=>{
    if(value.Country === this.state.Country)
    {
      return(
        <option value={value.Name}>{value.Name}</option>
      )
    }
  })
}

dashboard = ()=>{
  localStorage.setItem("dashboard" , true);
  window.location.reload();
}

    render(){
        let name = this.state.name
        let email = this.state.email
        //let card = this.state.bank
        var content = null;
        if((this.state.card && this.state.check === "Corect"))
        {
          content = (
            <div>
               <div class="modal-body">
            <label className="notification">Check your email</label>
            <div><h4 class="modal-title">Your key</h4></div>
            <input type="text" name="" id="input" class="form-control" value={this.state.key}/>
            </div>
            <div class="modal-footer">
            <CopyToClipboard text={this.state.key}
                    onCopy={() => this.setState({copied: true})}>
                     <button type="button" class="btn btn-success" >COPY</button>
                </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          
              <button type="button" class="btn btn-default" onClick={this.dashboard}>DONE</button>
            </div>
            </div>
          )
        }
        else{
          content=(
            <div> 
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
            <div class="modal-body" style={{textAlign: "center"}}>
            <label style={{color: "red"}}> Thông báo: Bạn chưa điền đầy đủ hoặc có thông tin sai xin vui long kiểm tra lại</label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
            </div>
            </div>
          )
        }
        if(localStorage.getItem("dashboard"))
        {
          localStorage.removeItem("dashboard")
          return <Redirect to="/dashboard"></Redirect>
        }
        return(

          
            <div>
              
              <div id="backgroundForm"><div id="supCredit">
                  <span id="card1">
                      <img src="credit1.png"></img>
                  </span>
                  <h2>Access to all Platform products</h2>
                  <p>Get all the resources you need to build and run your apps, websites, and services, including Firebase and the Convert API.</p>
                <h2>$ 300 credit offered</h2>
                    <p>Sign up and get a $ 300 credit on the Google Cloud Platform for 12 months.</p>
                    <h2>No direct debit after the free trial</h2>
                    <p>We ask you to enter your credit card information to verify that you are not a robot. Your account will not be charged unless you decide to manually upgrade to a paid account.</p>
                </div></div>
              
            <div className="form-style-10">
                  
        <h1>Extension<span>Fill out the information to extension the key!</span></h1>
        <form >

        <div className="section"><span>1</span>Your key</div>
          <div className="inner-wrap">
            <label style={{color: "black"}}> Value <input type="text" name="field1" value={this.state.keyvalue} readOnly /></label>
            <label style={{color: "black"}}> Status <input type="text" name="field1" value={this.state.keystatus} readOnly /></label>
         </div>
          <div className="section"><span>2</span>Your Information </div>
          <div className="inner-wrap">
            <label style={{color: "black"}}>Your Full Name <input type="text" name="field1" value={name} readOnly /></label>
         </div>

          <div className="section"><span>3</span>Credit Card &amp; Paypal</div>
          <div className="inner-wrap">
          <label style={{color: "black"}}>Country
          <select style={{outline: "none"}} value={this.state.Country} onChange={this.handleCountry}>
                <option value="Vietnam">Vietnam</option>
                <option value="Nation">Nation</option>
          </select>
          </label>
          <label style={{color: "black"}} >Bank
          <select style={{outline: "none"}} value={this.state.Bank} onChange={this.handlebank}>
            {this.loadBanks(this.state.names)}
          </select>
          </label>
            <label  style={{color: "black"}}>Card Number{"   "} <label style={{color: this.state.color}}>{this.state.check}</label> <input  style={{color: "black"}} type="text" name="field4" value={this.state.card} onChange={this.inputcard}/></label>
          </div>
          <div className="section"><span>4</span>Email or Phone number to comfirm</div>
          <div className="inner-wrap">
            <label  style={{color: "black"}}>Your email <input type="email" name="field5"  value={email} readOnly/></label>
          </div>
          <div className="section"><span>5</span>Pick package you want to extension </div>
          <div className="inner-wrap">
          <select style={{outline: "none"}} onChange={this.handleSelect} value={this.state.select}>
                <option value="1 Month">1 Months (1 $)</option>
                <option value="3 Months">3 Months (2.5 $)</option>
                <option value="6 Months">6 Months (5 $)</option> 
                <option value="9 Months">9 Months (7 $)</option>
                <option value="12 Months">12 Months (9 $)</option>
                <option value="Unlimited">Unlimited ($1/1000)</option> 
          </select>
          </div>
          <label style={{color: "green"}}>{this.state.notifycation}</label>
          <div className="button-section">
            <input type="button" value="Extension" name="Sign Up"  class="btn btn-primary" onClick={this.create}/>
          </div>
        </form>
      </div>
          <div class="modal fade" id="modal-id">
            <div class="modal-dialog">
              <div class="modal-content">
                {content}
              </div>
            </div>
          </div>
        </div>
        )
    }
}


export default Recreatekey;