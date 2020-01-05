
import React, { Component } from 'react'
import './style.css'
// import { Link } from 'react-router-dom'
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import API from '../../pages/Database/APICnn';
const api = new API()

class TableBoxKey extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fakedata: [],
      Isloading: false,
      search: "",
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
  extension = (e) => {
    localStorage.setItem("keyID", e.target.value);
  }
  
  renderTable = (data) => {
    console.log(data)
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
            {/* <CopyToClipboard text={value.value}>
              <button type="button" class="fa fa-clone fa-lg" title="Copy this key"></button>
            </CopyToClipboard>
            <button type="button" class="fa fa-eye fa-lg" value={value.id} onClick={this.vieclick} data-toggle="modal" href='#modal-id-view' title="View history of this key"></button>
            <button type="button" class="fa fa-recycle fa-lg" value={value.id + "/" + value.value} onClick={this.changekey} title="change key value" data-toggle="modal" href='#modal-id-changekey'></button>
            <Link to="/recreatekey"><button type="button" class="fa fa-credit-card-alt fa-lg" value={value.id} onClick={this.extension} title="Extension for this key" ></button></Link>
            <button type="button" class="fa fa-trash-o fa-lg" value={value.id} onClick={this.delclick} data-toggle="modal" href='#modal-id' title="Delete this key"></button> */}
          </td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div className='table-box'>
        <div className= 'table-user-title'><h2>Key Management</h2></div>
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
      </div>
    )
  }
}
export default TableBoxKey