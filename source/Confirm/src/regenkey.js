import React from 'react';
import axios from 'axios' ;

const localhost = "http://localhost:4000/";
const herokuhost = 'http://back-end-services-soa.herokuapp.com/'

class regenkey extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state= {
      data: "",
      loading: true,
      key: "",
    }
  }

  post = ()=>{
    axios.post(`${localhost}validation`,
    {
      msg: "sucessfully"
    })
    .then(res=>{
     this.setState({
       data: res.data,
       loading: false
     })
     setTimeout(()=>{
      window.close()
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
          console.log(match);
          if(this.state.key === match.match.params.id)
          {
            this.post();
          }
      })
      .catch(err=>{
        console.log(err);
      })
  }

  componentWillMount()
  {
      setTimeout(()=>{
        this.get();
      },1000);
      
  }

    render()
    {
      var notifycation = null;
      
      if(this.state.loading)
      {
        notifycation = (<label>Đang tiến hành xác thực thông tin...</label>)
      }
      else 
      {
        notifycation = (<label>Đang chuyển đôi gói! xin đợi giây lát...</label>)
      }

      return(
        <div style = {{textAlign: "center", marginTop: "250px"}}>
            
              <img src={"https://thumbs.gfycat.com/ObviousQuarrelsomeIntermediateegret-max-1mb.gif"} alt="loading..." style = {{width: "20px", height: "20px"}}/>{notifycation}
          </div>
      )
      
    }
}
export default regenkey;