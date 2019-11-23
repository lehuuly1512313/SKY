import React, { Component } from 'react';

import './App.css';
import App from './App'
import API from '././pages/Database/APICnn';
const api=new API();



class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        data: [],
        banks: [],
        name: []
    };
  }


  componentWillMount() {
    window.scrollTo(0, 0);

    api.out_of_date().then(res=>{
      console.log(res);
    })

    api.getData().then(response => {
      this.setState({
            data: response,
      })
    })
    api.getDataURL("https://back-end-services-soa.herokuapp.com/banks").then(res=>{
      this.setState({
        banks: res,
      })
    })

    api.getDataURL("https://back-end-services-soa.herokuapp.com/banks-name").then(res=>{
      console.log(res);
      this.setState({
        name: res,
        isLoading: true
      })
    })
  }
  render() {
      if(this.state.isLoading)
      {
          return(
              <div>
                  <App data={this.state.data} banks={this.state.banks} names={this.state.name}></App>
              </div>
          )
      }
      else
      {
          return(
            <div style={{textAlign: "center", marginTop: "250px"}}>
                <img src={"https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif"} alt="loading..." style={{width: "100px", height: "100px"}}/>
            </div>
          )
      }
  }
}

export default Loading;
