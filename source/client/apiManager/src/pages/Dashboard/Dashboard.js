import React, { Component } from "react";
import Chart from './Chart';
import API from '../../pages/Database/APICnn';
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './app.css'
const api = new API();

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.handleinput = this.handleinput.bind(this);
    this.timer = 0;
    this.state = {
      data: [],
      fakedata: [],
      Isloading: false,
      search: "",
      code: this.randomkey(),
      recode: "",
      lemail: localStorage.getItem("FacebookUser") || localStorage.getItem("GoogleUser"),
      userData: this.props.data,
      seconds: 10,
      showModal: false,
      last: "",
      source: "",
      bool: false,
      key: "",
    }
  }

  componentWillMount() {

    var lemail = "";
    if (localStorage.getItem('email')) {
      lemail = localStorage.getItem('email')
    }
    else {
      lemail = localStorage.getItem('user')
    }
    this.setState({ lemail })
    var data = {};
    if (localStorage.getItem("ID")) {
      data = { id: localStorage.getItem("ID") }
    }
    api.getKey(data).then(res => {
      var free = 0;
      var pay = 0;
      var un = 0;
      res.map(value => {
        if (value.type.includes("Free")) free += 1;
        if (value.type.includes("Month")) pay += 1;
        if (value.type.includes("Un")) un += 1;
      })
      this.setState({
        data: res,
        fakedata: res,
        free,
        pay,
        un,
        Isloading: true,
        length: res.length
      })
    })
  }



  back = () => {
    clearInterval(this.timer);
  }



  confirm = () => {
    var { code, recode } = this.state;
    if (code === recode) {
      this.setState({
        bool: true
      })
    }
    else {
      alert("Incorect! please try again!")
    }
  }

  RenderModalViewClick = () => {
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(24, 23, 23, 0.308)',
      padding: 50
    };
    return (
      <div class="modal fade" id="modal-id-view" style={backdropStyle}>
        <div class="modal-dialog" >
          <div class="modal-content">

            <div class="modal-body">
              <span className="login100-form-title p-b-59" style={{ textAlign: "center", fontSize: "20px" }}>
                History
              </span>
              <div class="row">
                <div class="col-sm-4"><span className="label-input100">Last time:</span></div>
                <div class="col-sm-4">{this.state.last}</div>
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>

              </div>
              <div class="row" >
                <div class="col-sm-4"><span className="label-input100">Source:</span></div>
                <div class="col-sm-4"><a href={this.state.source}>{this.state.source}</a></div>
              </div>

            </div>
            <div class="row" style={{
              textAlign: "center",
              paddingBottom: "50px",
            }}>
              <div class="col-sm-6"></div>
              <div class="col-sm-6"> <button type="button" class="btn btn-default" style={{ width: "80%", marginTop: "10px", textAlign: "center" }} onClick={this.back} data-dismiss="modal">Back</button></div>
            </div>
          </div>
        </div>
      </div>


    )
  }


  RenderModalDelClick = () => {
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
    if (this.state.seconds === 0) {
      notification = (
        <div><label className="notification">Check your email and then enter code you recived</label></div>
      )
    }
    else {
      notification = (
        <div>
          <div class="row">
            <div class="col-sm-9"> <label>{"Please waiting "}<label className="timer-span">{this.state.seconds}</label></label> <label> for sendMail</label></div>
          </div>
        </div>
      )
    }
    return (
      <div class="modal fade" id="modal-id" style={backdropStyle}>
        <div class="modal-dialog" >
          <div class="modal-content">

            <div class="modal-body">
              <span className="login100-form-title p-b-59" style={{ textAlign: "center", fontSize: "20px" }}>
                confirm delete key
                  </span>

              {notification}
              <div className="wrap-input100 validate-input" data-validate="Name is required">
                <span className="label-input100">Your code</span>
                <input className="input100" type="text" name="name" placeholder="Code..." style={{ fontSize: "20px" }} onChange={this.handleinput} />
                <span className="focus-input100" />
              </div>
            </div>
            <div class="row" style={{
              textAlign: "center",
              paddingBottom: "50px"
            }}>
              {/* {this.RedirectRender()} */}
              <div class="col-sm-6"> <button type="button" class="btn btn-default" style={{ width: "80%", marginTop: "10px" }} onClick={this.back} data-dismiss="modal">Back</button></div>
              <div class="col-sm-6"><button type="button" class="btn btn-primary" style={{ width: "80%", marginTop: "10px" }} onClick={this.confirm}>Confirm</button></div>
            </div>
          </div>
        </div>
      </div>


    )
  }


  move = () => {
    localStorage.setItem("component", "create-key");
  }

  handleinput(e) {
    this.setState({ recode: e.target.value })
    console.log(this.state.recode);
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  randomkey = () => {
    return this.s4() + this.s4();
  }

  delclick = (e) => {

    this.setState({
      ...this.state,
      id: e.target.value,
      seconds: 10
    })
    this.timer = setInterval(() => {
      let seconds = this.state.seconds - 1;
      this.setState({
        seconds
      });
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
    var data = {
      code: this.state.code,
      email: this.state.lemail,
      contain: "Đây là code của bạn dùng để xác nhận xóa key "
    }
    api.SendMail(data).then(res => {
      console.log(res);
      var set = setInterval(() => {
        api.delkey(this.state.id, { bool: this.state.bool }).then(res => {
          if (res === "done") {
            clearInterval(set);
            window.location.reload();
          }
        })
      }, 2000)
    })
  }

  vieclick = (e) => {
    this.state.data.map(value => {
      if (e.target.value === value.id.toString()) {
        this.setState({
          last: value.last,
          source: value.source
        })

        return true;
      }
    })

  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
    var search = e.target.value;
    var fakedata = [];
    if (search === "") {
      fakedata = this.state.data;
    }
    else {
      this.state.data.map(value => {
        if (value.value.includes(search)) {
          fakedata.push(value);
        }
      })
    }
    this.setState({ fakedata })

  }

  search = () => {
    var { search } = this.state;
    var { data } = this.state;
    var fakedata = [];
    if (search === "") {
      fakedata = data
    }
    else {
      this.state.fakedata.map(value => {
        if (value.value.includes(search)) {
          fakedata.push(value);
        }
      })
    }
    this.setState({ fakedata })
  }

  extension = (e) => {
    localStorage.setItem("keyID", e.target.value);
  }


  renderTable = (data) => {
    return data.map(value => {
      var color = "green";
      if (value.status === "expired") {
        color = "red"
      }
      return (
        <tr style={{ fontWeight: "bolder" }}>
          <td scope="row">{value.id}</td>
          <td>{value.value}</td>
          <td>{value.type}</td>
          <td style={{ color: `${color}` }}>{value.status}</td>
          <td >{value.start}</td>
          <td>{value.count}</td>
          <td>
            <CopyToClipboard text={value.value}>
              <button type="button" class="fa fa-clone fa-lg" title="Copy this key"></button>
            </CopyToClipboard>
            <button type="button" class="fa fa-eye fa-lg" value={value.id} onClick={this.vieclick} data-toggle="modal" href='#modal-id-view' title="View history of this key"></button>
            <button type="button" class="fa fa-recycle fa-lg" value={value.id + "/" + value.value} onClick={this.changekey} title="change key value" data-toggle="modal" href='#modal-id-changekey'></button>
            <Link to="/recreatekey"><button type="button" class="fa fa-credit-card-alt fa-lg" value={value.id} onClick={this.extension} title="Extension for this key" ></button></Link>
            <button type="button" class="fa fa-trash-o fa-lg" value={value.id} onClick={this.delclick} data-toggle="modal" href='#modal-id' title="Delete this key"></button>
          </td>
        </tr>
      )
    })
  }


  RenderChart = () => {
    var { free, pay, un } = this.state
    var chartData = {
      labels: ['Free Trial', 'Pay', 'Unlimted'],
      datasets: [
        {
          label: 'Population',
          data: [
            free,
            pay,
            un
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ]
        }
      ]
    }
    return <Chart chartData={chartData} legendPosition="bottom" />
  }

  changekey = (e) => {
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
    api.Changekey(key2).then(res => {
      this.setState({
        key: res
      })
    })

  }

  dashboard = () => {
    window.location.reload();
  }

  rendermodalchangekey = () => {
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(24, 23, 23, 0.308)',
      padding: 50
    };
    return (
      <div id="modal-id-changekey" class="modal fade" style={backdropStyle}>
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header" style={{ fontSize: '30px' }}>
              Change value of this key
              </div>
            <div class="modal-body">
              <label className="notification" style={{ color: "green", fontSize: '30px' }}>Your key has been changed</label>
              <input type="text" name="" id="input" style={{ color: "green" }} class="form-control" value={this.state.key} />
            </div>
            <div class="modal-footer">
              <CopyToClipboard text={this.state.key}
                onCopy={() => this.setState({ copied: true })}>
                <button type="button" class="btn btn-success" >COPY</button>
              </CopyToClipboard>
              {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}

              <button type="button" class="btn btn-default" onClick={this.dashboard}>DONE</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.Isloading) {
      if (this.state.length === 0) {
        return (
          <section className="over-p" style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>

            <div id="overview-dashboard">
              <h1 className="overview-h1 mr-l-50" style={{ color: "#202124" }}>Overview</h1>
              <div id="overview-warning">
                <div>
                  <p><strong style={{ color: "#1451a3" }}>New Users:</strong> Before you can start using the SOA Platform APIs and SDKs, you must sign up and create a billing account. To learn more, see <Link>Get Started with SOA Platform.</Link> </p>
                </div>

              </div>
              <div id='waring-desp'>
                <p>The SoA sound recognition lets you customize maps with your own content and imagery for display on web pages and mobile devices. The SoA sound recognition features four basic map types (roadmap, satellite, hybrid, and terrain) which you can modify using layers and styles, controls and events, and various services and libraries.</p>
              </div>
              <h2 className="overview-h2 mr-l-50">
                Step 1 : You need create a key
              </h2>
              <p id="overview-li" style={{ fontSize: "16px" }}>

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
              <Link className="btnSign" to="/create-key" style={{ position: "block", top: "216px", right: "94px" }}>
                <div className="btns btn1" style={{ textAlign: "center", marginLeft: '40px' }}>Get started</div>
              </Link>
            </div>

            <div>
              <h2 className="overview-h2 mr-l-50">
                Step 2 : Hello, World
              </h2>

            </div>
            <div>
              <p style={{ fontSize: "16px" }}>Copy the code into your project, you can customize the css if you want</p>
            </div>
            <div style={{ position: 'relative' }}>

              <button style={{ borderRadius: "5px", backgroundColor: "#5c5c6369", top: "10px", right: "10px", height: "50px", width: "50px", position: "absolute" }}>copy</button>

              <pre className="notranslate lang-html devsite-jsfiddle-code-sample" dir="ltr" is-upgraded><span className="dec">&lt;!DOCTYPE html&gt;</span><span className="pln"><br/></span><span className="tag">&lt;html&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;head&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;title&gt;</span><span className="pln">Simple SoA</span><span className="tag">&lt;/title&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">name</span><span className="pun">=</span><span className="atv">"viewport"</span><span className="pln"> </span><span className="atn">content</span><span className="pun">=</span><span className="atv">"initial-scale=1.0"</span><span className="tag">&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">charset</span><span className="pun">=</span><span className="atv">"utf-8"</span><span className="tag">&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;style&gt;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="com">/* Set css for data */&nbsp; &nbsp; &nbsp; &nbsp;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">#</span><span className="pln">showData</span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">color</span><span className="pun">:</span><span className="pln"> </span><span className="lit">green</span><span className="pun">;</span>
                <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                <span className="kwd">font-size</span><span className="pun">:</span><span className="pln"> </span><span className="lit">50px</span><span className="pun">;</span>
                <span className="pln"><br/> &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="com">/* Optional: Makes the sample page fill the window. */</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; html</span><span className="pun">,</span><span className="pln"> body</span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">height</span><span className="pun">:</span><span className="pln"> </span><span className="lit">100%</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">margin</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">padding</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;/style&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;/head&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;body&nbsp;<span className="atn">onload</span><span className="pun">=</span><span className="atv">"getData()"</span>&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;div</span><span className="pln"> </span><span className="atn">id</span><span className="pun">=</span><span className="atv">"showData"</span><span className="tag">&gt;&lt;/div&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;script&gt;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="kwd">var</span><span className="pln"> soa</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="kwd">function</span><span className="pln"> getData</span><span className="pun">()</span><span className="pln"> </span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; soa </span><span className="pun">=</span><span className="pln"> </span><span className="kwd">new</span>&nbsp;<span className="str">SOA()</span><span className="pln"> </span>
                <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="pln">soa</span><span className="pun">.</span><span className="pln">CnnTrans</span><span className="pun">(</span><span className="str">'YOUR_API_KEY','YOUR_WORD'</span><span className="pun">)</span><span className="pun">.</span><span className="kwd">then</span>(<span className="tag">res =></span>{`{`}</span>
                <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="pln">document</span><span className="pun">.</span><span className="pln">getElementById</span><span className="pun">(</span><span className="str">'showData'</span><span className="pun">)</span><span className="pun">.</span><span className="pln">innerHTML {`= res.vie;`}</span></span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"});</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;/script&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;script</span><span className="pln"> </span><span className="atn">src</span><span className="pun">=</span><span className="atv">"https://back-end-services-soa.herokuapp.com/API.js"</span><span className="tag">&gt;&lt;/script&gt;</span><span className="pln"><br/>&nbsp; </span>
                <span className="pln">{`  `}</span><span className="tag">&lt;script</span><span className="pln"> </span><span className="atn">src</span><span className="pun">=</span><span className="atv">"https://unpkg.com/axios/dist/axios.min.js"</span><span className="tag">&gt;&lt;/script&gt;</span><span className="pln"><br/>&nbsp; </span>
                <span className="tag">&lt;{`/`}body{`>`}&nbsp;</span></pre>
            </div>

            <div >
              <h2 className="overview-h2 mr-l-50">
                Step 3 : Set key into SDK
              </h2>
              <p style={{ fontSize: "16px" }}>
                Copy your key by clicking the button as shown below
                  </p>
              <img style={{ width: "100%" }} src="./servicesStyle/images/COPYKEY.png"></img>
              <p style={{ fontSize: "16px" }}>
                Copy your key by clicking the button as shown below
                  </p>

              <img style={{ width: "100%" }} src="./servicesStyle/images/PASTE.png"></img>
            </div>




          </section>
        )
      }
      else {
        return (
          <div>
            {this.RenderModalDelClick()}
            {this.RenderModalViewClick()}
            {this.rendermodalchangekey()}
            {/* <div id = "overview-dashboard" ><h1 style = {{marginLeft: "5%"}}>Management</h1></div> */}
            <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <input type="text" style={{ width: "100%" }} class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search" onChange={this.handleSearch} />
            </div>

            <div className="over-p" style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <table class="table table-striped table-inverse table-responsive" style={{ width: "100%" }}>
                <thead class="thead-inverse" style={{ backgroundColor: "#3b5998", color: "white" }}>
                  <tr>
                    <th >ID</th>
                    <th style={{ width: "15%" }}>Key</th>
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

              <div id="overview-dashboard">
                <h1 className="overview-h1 mr-l-50" style={{ color: "#202124" }}>Overview</h1>
                <div id="overview-warning">
                  <div>
                    <p><strong style={{ color: "#1451a3" }}>New Users:</strong> Before you can start using the SOA Platform APIs and SDKs, you must sign up and create a billing account. To learn more, see <Link>Get Started with SOA Platform.</Link> </p>
                  </div>

                </div>
                <div id='waring-desp'>
                  <p>The SoA Sound recognition lets you customize maps with your own content and imagery for display on web pages and mobile devices. The SoA sound recognition features four basic map types (roadmap, satellite, hybrid, and terrain) which you can modify using layers and styles, controls and events, and various services and libraries.</p>
                </div>
                <h2 className="overview-h2 mr-l-50">
                  Step 1 : You need create a key
              </h2>
                <p id="overview-li" style={{ fontSize: "16px" }}>

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
                <Link className="btnSign" to="/create-key" style={{ position: "block", top: "216px", right: "94px" }}>
                <div className="btns btn1" style={{ textAlign: "center", marginLeft: '40px' }}>Get started</div>
              </Link>
              </div>

              <div>
                <h2 className="overview-h2 mr-l-50">
                  Step 2 : Hello, World
              </h2>

              </div>
              <div>
                <p style={{ fontSize: "16px" }}>Copy the code into your project, you can customize the css if you want</p>
              </div>
              <div style={{ position: 'relative' }}>

                <button style={{ borderRadius: "5px", backgroundColor: "#5c5c6369", top: "10px", right: "10px", height: "50px", width: "50px", position: "absolute" }}>copy</button>

                <pre className="notranslate lang-html devsite-jsfiddle-code-sample" dir="ltr" is-upgraded><span className="dec">&lt;!DOCTYPE html&gt;</span><span className="pln"><br/></span><span className="tag">&lt;html&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;head&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;title&gt;</span><span className="pln">Simple SoA</span><span className="tag">&lt;/title&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">name</span><span className="pun">=</span><span className="atv">"viewport"</span><span className="pln"> </span><span className="atn">content</span><span className="pun">=</span><span className="atv">"initial-scale=1.0"</span><span className="tag">&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;meta</span><span className="pln"> </span><span className="atn">charset</span><span className="pun">=</span><span className="atv">"utf-8"</span><span className="tag">&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;style&gt;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="com">/* Set css for data */&nbsp; &nbsp; &nbsp; &nbsp;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">#</span><span className="pln">showData</span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">color</span><span className="pun">:</span><span className="pln"> </span><span className="lit">green</span><span className="pun">;</span>
                  <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                  <span className="kwd">font-size</span><span className="pun">:</span><span className="pln"> </span><span className="lit">50px</span><span className="pun">;</span>
                  <span className="pln"><br/> &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="com">/* Optional: Makes the sample page fill the window. */</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; html</span><span className="pun">,</span><span className="pln"> body</span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">height</span><span className="pun">:</span><span className="pln"> </span><span className="lit">100%</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">margin</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="kwd">padding</span><span className="pun">:</span><span className="pln"> </span><span className="lit">0</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;/style&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;/head&gt;</span><span className="pln"><br/>&nbsp; </span><span className="tag">&lt;body&nbsp;<span className="atn">onload</span><span className="pun">=</span><span className="atv">"getData()"</span>&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;div</span><span className="pln"> </span><span className="atn">id</span><span className="pun">=</span><span className="atv">"showData"</span><span className="tag">&gt;&lt;/div&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;script&gt;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="kwd">var</span><span className="pln"> soa</span><span className="pun">;</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="kwd">function</span><span className="pln"> getData</span><span className="pun">()</span><span className="pln"> </span><span className="pun">{"{"}</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; soa </span><span className="pun">=</span><span className="pln"> </span><span className="kwd">new</span>&nbsp;<span className="str">SOA()</span><span className="pln"> </span>
                  <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="pln">soa</span><span className="pun">.</span><span className="pln">CnnTrans</span><span className="pun">(</span><span className="str">'YOUR_API_KEY','YOUR_WORD'</span><span className="pun">)</span><span className="pun">.</span><span className="kwd">then</span>(<span className="tag">res =></span>{`{`}</span>
                  <span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="pln">document</span><span className="pun">.</span><span className="pln">getElementById</span><span className="pun">(</span><span className="str">'showData'</span><span className="pun">)</span><span className="pun">.</span><span className="pln">innerHTML {`= res.vie;`}</span></span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"});</span><span className="pln"><br/>&nbsp; &nbsp; &nbsp; </span><span className="pun">{"}"}</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;/script&gt;</span><span className="pln"><br/>&nbsp; &nbsp; </span><span className="tag">&lt;script</span><span className="pln"> </span><span className="atn">src</span><span className="pun">=</span><span className="atv">"https://back-end-services-soa.herokuapp.com/API.js"</span><span className="tag">&gt;&lt;/script&gt;</span><span className="pln"><br/>&nbsp; </span>
                  <span className="pln">{`  `}</span><span className="tag">&lt;script</span><span className="pln"> </span><span className="atn">src</span><span className="pun">=</span><span className="atv">"https://unpkg.com/axios/dist/axios.min.js"</span><span className="tag">&gt;&lt;/script&gt;</span><span className="pln"><br/>&nbsp; </span>
                  <span className="tag">&lt;{`/`}body{`>`}&nbsp;</span></pre>
              </div>

              <div >
                <h2 className="overview-h2 mr-l-50">
                  Step 3 : Set key into SDK
              </h2>
                <p style={{ fontSize: "16px" }}>
                  Copy your key by clicking the button as shown below
                  </p>
                <img style={{ width: "100%" }} src="./servicesStyle/images/COPYKEY.png"></img>
                <p style={{ fontSize: "16px" }}>
                  Copy your key by clicking the button as shown below
                  </p>

                <img style={{ width: "100%" }} src="./servicesStyle/images/PASTE.png"></img>
              </div>
            </div>
          </div>
        )
      }
    }
    else {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <img src={"https://retchhh.files.wordpress.com/2015/03/loading4.gif?w=300&h=300"} alt="loading..." style={{ width: "50px", height: "50px" }} />
        </div>
      )
    }
  }
}


export default Dashboard;