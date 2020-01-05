import React, { Component } from 'react';
import API from '../Database/APICnn';
const api=new API();

class ReplyMail extends Component {

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
      reply: "",
      data: this.props.data,
      complete: null,
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
        var data2= JSON.parse(localStorage.getItem("reply"));
       
       
            var name = data2.name;
            var from = data2.from;
            var contents = data2.contents;
            var telno = data2.telno;
            var company = data2.company;
            var position = data2.position;
            var names=name.split(" ");
            var id = data2.id;
            this.setState({
            ...this.state,
            first_name: names.pop(),
            last_name: names.toString().split(",").join(" "),
            from,
            contents,
            telno,
            company,
            position,
            id
            })
     
  }

    handleContent(e)
    {
      this.setState({reply: String(e.target.value)});
    }

    SendContacts=()=>{
      var data={
        id: this.state.id,
        content: this.state.reply,
        email: this.state.from,
      }

      api.sendreply(data).then(res=>{
        if(res === "done")
        {
          this.setState({
            content: "",
            complete: "Sent",
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
                      <input type="text" id="fname" className="form-control form-control-lg" value={this.state.first_name} readOnly/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="lname">Last Name</label>
                      <input type="text" id="lname" className="form-control form-control-lg" value={this.state.last_name} readOnly/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="eaddress">From</label>
                      <input type="text" id="eaddress" className="form-control form-control-lg" value={this.state.from} readOnly/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="tel">Tel. Number</label>
                      <input type="text" id="tel" className="form-control form-control-lg" value={this.state.telno} readOnly/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="eaddress">Your company</label>
                      <input type="text" id="eaddress" className="form-control form-control-lg" value={this.state.company}  readOnly/>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="tel">Position</label>
                      <input type="text" id="tel" className="form-control form-control-lg" readOnly value={this.state.position}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 form-group" readOnly>
                      <label htmlFor="message">Content</label>
                      <textarea name id="message" cols={30} rows={10} className="form-control"  readOnly value={this.state.contents}  />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="message">Reply</label>
                      <textarea name id="message" cols={30} rows={10} className="form-control" value={this.state.reply}  onChange={this.handleContent}/>
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







export default ReplyMail;