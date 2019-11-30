import React, {Component} from "react";
import Chart from './Chart';
import API from '../../pages/Database/APICnn';
import {Link} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const api=new API();

class Dashboard extends Component{

    constructor(props)
    {
        super(props)
        this.handleinput=this.handleinput.bind(this);
        this.timer=0;
        this.state={
            data: [],
            fakedata:[],
            Isloading: false,
            search: "",
            code: this.randomkey(),
            recode: "",
            lemail: localStorage.getItem("FacebookUser")||localStorage.getItem("GoogleUser"),
            userData: this.props.data,
            seconds: 10,
            showModal: false,
            last: "",
            source: "",
            bool: false,
            key: "",
        }
    }

    componentWillMount()
    {
      if(localStorage.getItem("ID"))
      {
          this.state.userData.map(value=>{
              if(localStorage.getItem("ID") === value.id.toString())
              {
                this.setState({lemail: value.email})
                return true;
              }
          })
      }
        var data={};
        if(localStorage.getItem("ID"))
        {
            data={id: localStorage.getItem("ID")}
        }
        api.getKey(data).then(res=>
            {
                var free=0;
                var pay=0;
                var un=0;
                res.map(value=>{
                    if(value.type.includes("Free")) free+=1;
                    if(value.type.includes("Month")) pay+=1;
                    if(value.type.includes("Un")) un+=1;
                })
               this.setState({
                   data:res,
                   fakedata: res,
                   free,
                   pay,
                   un,
                   Isloading: true,
                   length: res.length
               })
            })
    }
  
      

    back=()=>{
      clearInterval(this.timer);
    }

     

    confirm= ()=>{
        var {code, recode}=this.state;
        if(code===recode)
        {
            this.setState({
              bool:true
            })
        }
        else
        {
          alert("Incorect! please try again!")
        }
    }

    RenderModalViewClick=()=>{
      const backdropStyle={
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(24, 23, 23, 0.308)',
        padding: 50
      };
      return(     
        <div  class="modal fade" id="modal-id-view" style={backdropStyle}>
          <div class="modal-dialog" >
            <div class="modal-content">
              
              <div class="modal-body">
              <span className="login100-form-title p-b-59" style={{textAlign :"center",fontSize: "20px"}}>
                    History
              </span>
              <div class="row">
                <div class="col-sm-4"><span className="label-input100">Last time:</span></div>
                <div class="col-sm-4">{this.state.last}</div>
              </div>
              <div style={{paddingTop: "10px", paddingBottom: "10px"}}>

              </div>
              <div class="row" >
                <div class="col-sm-4"><span className="label-input100">Source:</span></div>
                <div class="col-sm-4"><a href={this.state.source}>{this.state.source}</a></div>
              </div>

              </div>
              <div class="row" style={{
                textAlign: "center",
                paddingBottom : "50px",
                }}>
                <div class="col-sm-6"></div>
                <div class="col-sm-6"> <button type="button" class="btn btn-default" style={{width :"80%", marginTop: "10px",textAlign: "center"}} onClick={this.back} data-dismiss="modal">Back</button></div>
              </div>
            </div>
          </div>
        </div>
        

      )
  }
    

    RenderModalDelClick=()=>{
          const backdropStyle={
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(24, 23, 23, 0.308)',
            padding: 50
          };
          var notification=null;
          if(this.state.seconds === 0)
          {
            notification=(
              <div><label className="notification">Check your email and then enter code you recived</label></div>
            )
          }
          else
          {
            notification=(
              <div>
                      <div class="row">
                        <div class="col-sm-9"> <label>{"Please waiting "}<label className="timer-span">{this.state.seconds}</label></label> <label> for sendMail</label></div>
                      </div>
                </div>
            )
          }
          return(     
            <div  class="modal fade" id="modal-id" style={backdropStyle}>
              <div class="modal-dialog" >
                <div class="modal-content">
                  
                  <div class="modal-body">
                  <span className="login100-form-title p-b-59" style={{textAlign :"center",fontSize: "20px"}}>
                        confirm delete key
                  </span>
                  
                  {notification}
                  <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">Your code</span>
                        <input className="input100" type="text" name="name" placeholder="Code..." style={{fontSize: "20px"}} onChange={this.handleinput}/>
                        <span className="focus-input100" />
                      </div>
                  </div>
                  <div class="row" style={{
                    textAlign: "center",
                    paddingBottom : "50px"
                    }}>
                      {/* {this.RedirectRender()} */}
                    <div class="col-sm-6"> <button type="button" class="btn btn-default" style={{width :"80%", marginTop: "10px"}} onClick={this.back} data-dismiss="modal">Back</button></div>
                    <div class="col-sm-6"><button type="button" class="btn btn-primary" style={{width :"80%", marginTop: "10px"}} onClick={this.confirm}>Confirm</button></div>
                  </div>
                </div>
              </div>
            </div>
            

          )
      }

      
      move=()=>
      {
        localStorage.setItem("component", "create-key");
      }

      handleinput(e){
        this.setState({recode: e.target.value})
        console.log(this.state.recode);
      }
      
      s4=()=>{
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
    
      randomkey=()=>
      {
        return this.s4() + this.s4();
      }

    delclick=(e)=>
    {
        
        this.setState({
            ...this.state,
            id: e.target.value,
            seconds: 10
        })
        this.timer=setInterval(()=>{
        let seconds=this.state.seconds - 1;
        this.setState({
          seconds
        });
        if(seconds === 0)
        {
            clearInterval(this.timer);
        }
        }, 1000);
        var data={
            code: this.state.code,
            email: this.state.lemail,
            contain: "Đây là code của bạn dùng để xác nhận xóa key "
          }
        api.SendMail(data).then(res=>{
            console.log(res);
            var set = setInterval(()=>{
            api.delkey(this.state.id,{bool: this.state.bool}).then(res=>{
              if(res === "done")
              {
                clearInterval(set);
                window.location.reload();
              }
            })
            },2000)
        })
    }

    vieclick=(e)=>
    {
      this.state.data.map(value=>{
        if(e.target.value === value.id.toString())
        {
          this.setState({
            last: value.last,
            source: value.source
          })
         
          return true;
        }
      })
     
    }

    handleSearch=(e)=>{
        this.setState({search: e.target.value});
        var search=e.target.value;
        var fakedata=[];
        if(search === "")
        {
            fakedata=this.state.data;
        }
        else
        {
            this.state.data.map(value=>{
                if(value.value.includes(search))
                {
                fakedata.push(value);
                }
            })
        }
        this.setState({fakedata})
        
    }

    search=()=>{
        var {search}=this.state;
        var {data}=this.state;
        var fakedata=[];
        if(search === "")
        {
            fakedata=data
        }
        else
        {
            this.state.fakedata.map(value=>{
                if(value.value.includes(search))
                {
                fakedata.push(value);
                }
            })
        }
        this.setState({fakedata})
    }

    extension=(e)=>{
      localStorage.setItem("keyID",e.target.value);
    }


    renderTable=(data)=>{
        return data.map(value=>{
          var color = "green";
          if(value.status === "expired")
          {
            color = "red"
          }
            return(
                <tr style = {{fontWeight:"bolder"}}>
                    <td scope="row">{value.id}</td>
                    <td>{value.value}</td>
                    <td>{value.type}</td>
                    <td style = {{color:`${color}`}}>{value.status}</td>
                    <td >{value.start}</td>
                    <td>{value.count}</td>
                    <td>
                    <CopyToClipboard text={value.value}>
                      <button type="button" class="fa fa-clone fa-lg" title="Copy this key"></button>
                    </CopyToClipboard>
                    <button type="button" class="fa fa-eye fa-lg" value={value.id} onClick={this.vieclick} data-toggle="modal" href='#modal-id-view' title="View history of this key"></button>
                    <button type="button" class="fa fa-recycle fa-lg" value={value.id + "/"+value.value} onClick={this.changekey} title="change key value" data-toggle="modal" href='#modal-id-changekey'></button>
                    <Link to="/recreatekey"><button type="button" class="fa fa-credit-card-alt fa-lg" value={value.id} onClick={this.extension} title="Extension for this key" ></button></Link>
                    <button type="button" class="fa fa-trash-o fa-lg" value={value.id} onClick={this.delclick} data-toggle="modal" href='#modal-id' title="Delete this key"></button>
                   </td> 
                </tr>
            )
        })
    }


    RenderChart=()=>{
        var {free,pay,un}=this.state
        var chartData={labels: ['Free Trial', 'Pay', 'Unlimted'],
        datasets:[
          {
            label:'Population',
            data:[
               free,
               pay,
               un 
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ]
          }
        ]}
       return <Chart chartData={chartData} legendPosition="bottom" />
    }

    changekey = (e)=>
    {
      var value = e.target.value.split("/");
      var key = value[1];
      var id = value[0];
      this.setState({
        key: key
      })

     
      var key2 = {
          msg: "change-key",
          id,
          key,
          start: Date.now(),
          user: localStorage.getItem("ID")
        }
      api.Changekey(key2).then(res=>{
      this.setState({
        key: res
        })
      })
     
    }

    dashboard= ()=>{
      window.location.reload();
    }

    rendermodalchangekey = ()=>{
      const backdropStyle={
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(24, 23, 23, 0.308)',
        padding: 50
      };
      return(
        <div id="modal-id-changekey" class="modal fade" style={backdropStyle}>
         <div class="modal-dialog" >
            <div class="modal-content">
            <div class="modal-header" style = {{fontSize:'30px'}}>
              Change value of this key
              </div>
        <div class="modal-body">
     <label className="notification" style = {{color: "green", fontSize:'30px'}}>Your key has been changed</label>
     <input type="text" name="" id="input" style = {{color: "green"}} class="form-control" value={this.state.key}/>
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
     </div>
     </div>
      );
    }

    render()
    {
        if(this.state.Isloading)
        {
         if(this.state.length === 0)
         {
           return(
            // <div style={{width: "60%", marginLeft:"20%",boxShadow: "5px 5px 5px #666",background: "#eee",marginTop: "20px", padding: "10px 50px 10px 50px"}}>
            //   <div style={{textAlign: "center"}}>
            //     <div><img class="navigation-image" src="//cdn.jotfor.ms/assets/img/memberkit/user_guide_images/f1.png?v=0.2" style={{width: "100px", height:"100px"}} alt="Getting Started with JotForm Podo"/></div>
            //     <div style={{fontSize:"16px"}}>SOA User Guide / Getting Started with SOA</div>
            //   </div>
           
            // <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/2-How-to-Create-Your-First-Web-Form">How to create a Key</a>
            // </h2>
            // <p class="chapterSummary">
            // First-time SOA users often ask how to create a simple web form, how to set up Email Notifications, how to embed a form on a website, how to test the form to see if it's working, and how to view responses in email and JotForm Inbox.&amp;nbsp;Got a... or <Link to="/create-key" onClick={this.move}>Click here to get started</Link></p> 
            
            // <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/526-How-to-Change-the-Username">How to change the password?</a>
            // </h2>
            // <p class="chapterSummary">
            // NOTE: This guide is valid only for accounts in the Starter (FREE) plan. If your account is on a paid plan and you want to change the username, contact us here.To change the username of your JotForm account, follow the steps below.1. Go to the Profile... </p> <h2>

            // <a class="chapterTitle" href="https://www.jotform.com/help/489-How-to-reset-the-password">How to reset the password?</a>
            // </h2>
            // <p class="chapterSummary">
            // If you need help resetting your password, we can help by sending you a link to reset it.In order to get the link you need to:1. Visit Jotform's Website.&amp;nbsp;2. Click on Login button.3. Click on Forgot Password?4. Enter either the email address o... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to delete a key?</a>
            // </h2>
            // <p class="chapterSummary">
            // NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to update your profile?</a>
            // </h2>
            // <p class="chapterSummary">
            // NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to use a key?</a>
            // </h2>
            // <p class="chapterSummary">
            // NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/46-Quick-Overview-of-Form-Fields">Introduce</a>
            // </h2>
            // <p class="chapterSummary">
            // JotForm has pretty much any type of Form Fields you might need. Take a look at the complete list below and get a brief description of each one of them.BASIC FORM ELEMENTSHEADER: A Header briefly explains what your form is about. Use the Subheader if ... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/106-How-to-Use-Form-Templates">Package</a>
            // </h2>
            // <p class="chapterSummary">
            // Form Templates&amp;nbsp;are the usual go-to solution of first time JotForm users. Whether you're looking for a template to get started with, a form that closely matches your requirement, or even just using it for the design and layout, templates are ... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/184-How-to-Apply-a-Theme-to-Your-Form">Create key</a>
            // </h2>
            // <p class="chapterSummary">
            // Applying a Theme within the Form BuilderTo apply a theme to your form in the form builder, follow these steps:1. Open your form in the form builder2. Click the Form Designer icon3. Go to Themes tab and select the theme you wish to use.Applying a Them... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/420-What-s-New-in-JotForm-4-0">Docs</a>
            // </h2>
            // <p class="chapterSummary">
            // JotForm 4.0 was built around the idea that making forms should be a breeze. The main goal is effortless form creation anytime, anywhere, and on any device with ease.You may have seen the improvements we had back when we launched V3 but the new sets o... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/408-Understanding-Your-Account-Usage-and-Limits">Contact</a>
            // </h2>
            // <p class="chapterSummary">
            // Confused on how your account limits work? Don't worry, in this guide we got you covered. Here, we will help you understand the different limits that your account has based on the subscription or plan that you are into.First, please visit our PRICING ... </p> <h2>
            // <a class="chapterTitle" href="https://www.jotform.com/help/56-Quick-overview-of-form-themes">About us</a>
            // </h2>
            // <p class="chapterSummary">
            // If you want to know how to change the themes of your forms, click here.If you're here to just look around to see how the form's style changes with each theme applied, we hope you enjoy the tour.DefaultNova ThemePastel ThemeJot ThemeBaby BluePaper Gre... </p> <h2>

            // <a class="chapterTitle" href="https://www.jotform.com/help/8-Terms-of-Use">Terms of Use</a>
            // </h2>
            // <p class="chapterSummary">
            // Please read this Agreement carefully to ensure you understand each provision. These Terms of Service ("Terms") govern your use of JotForm, Inc. ("Company", JotForm) web site located at https://www.jotform.com (the "Site&amp;q... </p>
            
            
            // </div>
            <section id="sec-1">
            <span id="join-over">
                At the moment we have collaborated with more than <strong>1000 developers</strong>.
            </span>
            <span id="practice">
              and you will be the next person we collaborate with. You need to create a key to get started, let us help you, click the button below and follow the instructions
            </span>
                <div id="btn-sign">
                <Link className="btnSign" to="/create-key">
                    <div className="btns btn1">Get started &amp; Code</div>
                </Link>
                </div>
            
            </section>
           )
         }
         else
         {
        return(
        <div>
            {this.RenderModalDelClick()}
            {this.RenderModalViewClick()}
            {this.rendermodalchangekey()}

            <div style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
              <input type="text" style={{width: "100%"}} class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search" onChange={this.handleSearch}/>
            </div>
             
        <div style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
            <table class="table table-striped table-inverse table-responsive" style={{width: "100%"}}>
                <thead class="thead-inverse" style={{backgroundColor: "#3b5998", color: "white"}}>
                    <tr>
                        <th >ID</th>
                        <th style={{width: "15%"}}>Key</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Start date</th>
                        <th>Called</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.state.fakedata)}
                    </tbody>
            </table>
            <div>
                {this.RenderChart()}
            </div>

            <div >
              <h2>
                Step 1
              </h2>
              <p style = {{fontSize: "16px"}}>
                 You need create a key 
                 <ul>
                   <li>
                     <div>
                        If you do not have any key to use then please press this button in the dashboard
                      </div>
                    </li>
                    <li>
                     <div>
                     If you already have one, you can skip this step, or create an additional key by clicking the create key button on the menu
                      </div>
                    </li>
                 </ul>
              </p>
           
            </div>
         
            <div>
              <h2>
                Step 2
              </h2>

            </div>
            <div>
            <p style = {{fontSize: "16px"}}>Copy the code into your project, you can customize the css if you want</p>
            </div>
            <div>
              <pre className="notranslate lang-html devsite-jsfiddle-code-sample" dir="ltr" is-upgraded><span className="dec">&lt;!DOCTYPE html&gt;</span><span className="pln"><br /></span><span className="tag">&lt;html&gt;</span><span className="pln"><br />&nbsp; </span><span className="tag">&lt;head&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;title&gt;</span><span className="pln">Simple Map</span><span className="tag">&lt;/title&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">name</span><span className="pun">=</span><span className="atv">"viewport"</span><span className="pln"> </span><span className="atn">content</span><span className="pun">=</span><span className="atv">"initial-scale=1.0"</span><span className="tag">&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">charset</span><span className="pun">=</span><span className="atv">"utf-8"</span><span className="tag">&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;style&gt;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="com">/* Always set the map height explicitly to define the size of the div<br />&nbsp; &nbsp; &nbsp; &nbsp;* element that contains the map. */</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="pun">#</span><span className="pln">map </span><span className="pun">{"{"}</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">height</span><span className="pun">:</span><span className="pln"> </span><span className="lit">100%</span><span className="pun">;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="com">/* Optional: Makes the sample page fill the window. */</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; html</span><span className="pun">,</span><span className="pln"> body </span><span className="pun">{"{"}</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">height</span><span className="pun">:</span><span className="pln"> </span><span className="lit">100%</span><span className="pun">;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">margin</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">padding</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;/style&gt;</span><span className="pln"><br />&nbsp; </span><span className="tag">&lt;/head&gt;</span><span className="pln"><br />&nbsp; </span><span className="tag">&lt;body&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;div</span><span className="pln"> </span><span className="atn">id</span><span className="pun">=</span><span className="atv">"map"</span><span className="tag">&gt;&lt;/div&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;script&gt;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="kwd">var</span><span className="pln"> map</span><span className="pun">;</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="kwd">function</span><span className="pln"> initMap</span><span className="pun">()</span><span className="pln"> </span><span className="pun">{"{"}</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; map </span><span className="pun">=</span><span className="pln"> </span><span className="kwd">new</span><span className="pln"> google</span><span className="pun">.</span><span className="pln">maps</span><span className="pun">.</span><span className="typ">Map</span><span className="pun">(</span><span className="pln">document</span><span className="pun">.</span><span className="pln">getElementById</span><span className="pun">(</span><span className="str">'map'</span><span className="pun">),</span><span className="pln"> </span><span className="pun">{"{"}</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; center</span><span className="pun">:</span><span className="pln"> </span><span className="pun">{"{"}</span><span className="pln">lat</span><span className="pun">:</span><span className="pln"> </span><span className="pun">-</span><span className="lit">34.397</span><span className="pun">,</span><span className="pln"> lng</span><span className="pun">:</span><span className="pln"> </span><span className="lit">150.644</span><span className="pun">{"}"},</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; zoom</span><span className="pun">:</span><span className="pln"> </span><span className="lit">8</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"});</span><span className="pln"><br />&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;/script&gt;</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="tag">&lt;script</span><span className="pln"> </span><span className="atn">src</span><span className="pun">=</span><span className="atv">"https://maps.googleapis.com/maps/api/js?key=</span><span><devsite-credentials-dialog type="api_key" className data-modal-dialog-id="api-key-credentials-dialog" data-title="Click to insert your API key">YOUR_API_KEY</devsite-credentials-dialog></span><span className="atv">&amp;callback=initMap"</span><span className="pln"><br />&nbsp; &nbsp; </span><span className="atn">async</span><span className="pln"> </span><span className="atn">defer</span><span className="tag">&gt;&lt;/script&gt;</span><span className="pln"><br />&nbsp; </span></pre>
            </div>

            <div >
              <h2>
                Step 3
              </h2>
              <p style = {{fontSize: "16px"}}>
              Copy your key by clicking the button as shown below
                  </p>
            <img style = {{width: "100%"}} src="./servicesStyle/images/COPYKEY.png"></img>
            <p style = {{fontSize: "16px"}}>
              Copy your key by clicking the button as shown below
                  </p>

              <img style = {{width: "100%"}} src="./servicesStyle/images/PASTE.png"></img>
            </div>
        </div>
        </div>
        )
         }
        }
        else
        {
            return(
                <div style={{textAlign: "center", marginTop: "100px"}}>
                    <img src={"https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"} alt="loading..." style={{width: "100px", height: "100px"}}/>
                </div>
              )
        }
    }
}


export default Dashboard;