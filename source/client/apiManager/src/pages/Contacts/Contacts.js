import React, { Component } from 'react';
import API from '../Database/APICnn';
const api=new API();

class Contacts extends Component {

  constructor(props) {
    super(props);
    this.handleContent=this.handleContent.bind(this);
    this.SendContacts=this.SendContacts.bind(this);
    this.state={
      laccount :JSON.parse(localStorage.getItem('laccount')) || [],
      lpassword: JSON.parse(localStorage.getItem('lpassword')) || [],
      account: localStorage.getItem('user') || [],
      first_name: "",
      last_name: "",
      content: "",
      data: this.props.data,
      complete: null,
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
            avatar: value.avatar
          })
          return true;
        }
    })

    if(localStorage.getItem("FacebookID"))
      {
        var id=localStorage.getItem("FacebookID");
        var name=localStorage.getItem("FacebookName");
        var avatar=localStorage.getItem("FacebookPicture");
        var email=localStorage.getItem("FacebookUser");
        var names=name.split(" ");
        this.setState({
          ...this.state,
          first_name: names.pop(),
          last_name: names.toString().split(",").join(" "),
          id,
          phone: id,
          email,
          avatar
        })
      }
      if(localStorage.getItem("GoogleID"))
      {
        var id=localStorage.getItem("GoogleID");
        var name=localStorage.getItem("GoogleName");
        var avatar=localStorage.getItem("GooglePicture");
        var email=localStorage.getItem("GoogleUser");
        var names=name.split(" ");
        this.setState({
          ...this.state,
          first_name: names.pop(),
          last_name: names.toString().split(",").join(" "),
          id,
          phone: id,
          email,
          avatar
        })
      }
    
  }

    handleContent(e)
    {
      this.setState({content: String(e.target.value)});
    }

    SendContacts=()=>{
      var data={
        content: this.state.content,
        from: this.state.email,
        email: this.state.email,
      }

      api.SendMailContacts(data).then(res=>{
        if(res === "done")
        {
          this.setState({
            content: "",
            complete: "Sent this contact",
          })
        }
      })

      setTimeout(() => {
        this.setState({complete: ""})
      }, 2000);

    }

    render() {
        return (
            <div>
            
            <div className="site-wrap">
          <div className="noIndex site-section ftco-subscribe-1 site-blocks-cover pb-4" style={{backgroundImage: 'url("./servicesStyle/images/bg_1.jpg")',height: "150px",backgroundPosition : "center center",position : "relative",  }}>
                
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7">
            </div>
          </div>
        </div>
      </div>
              <div className="site-section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="fname">First Name</label>
                      <input type="text" id="fname" className="form-control form-control-lg" value={this.state.first_name}/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="lname">Last Name</label>
                      <input type="text" id="lname" className="form-control form-control-lg" value={this.state.last_name}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="eaddress">Email Address</label>
                      <input type="text" id="eaddress" className="form-control form-control-lg" value={this.state.email}/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="tel">Tel. Number</label>
                      <input type="text" id="tel" className="form-control form-control-lg" value={this.state.phone}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="eaddress">Your company</label>
                      <input type="text" id="eaddress" className="form-control form-control-lg"/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="tel">Position</label>
                      <input type="text" id="tel" className="form-control form-control-lg"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="message">Message</label>
                      <textarea name id="message" cols={30} rows={10} className="form-control" value={this.state.content}  onChange={this.handleContent}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div style={{fontSize: "16px", color: "green"}}>{this.state.complete}</div>
                      <input type="button" value="Send" className="btn btn-primary btn-lg px-5" onClick={this.SendContacts}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}







export default Contacts;
