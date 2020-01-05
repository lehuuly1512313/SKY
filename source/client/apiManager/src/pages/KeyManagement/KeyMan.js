import React, {Component} from "react";
import API from '../../pages/Database/APICnn';
import "./../../App.css"

const api=new API();

class KeyMan extends Component{

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
            AdminPublicKey: "",
            userData: this.props.data,
            seconds: 10,
            showModal: false,
            last: "",
            source: "",
            bool: false,
            id: "",
            notification: "",
            color: "red"
        }
    }

    componentWillMount()
    {
        api.getallkey().then(res=>{
            this.setState({
                data: res,
                fakedata: res,
                Isloading: true,
            })
        })
    }
  
    
     

    confirm= ()=>{
        var data = {
            id: this.state.id,
            public_key: this.state.AdminPublicKey
        }
        api.admindelkey(data).then(res=>{
            this.setState({
                notification: res
            })
            if(res.includes("succesfully"))
            {
                this.dashboard()
                this.setState({
                    color: "green"
                })
            }
            setTimeout(()=>{
                this.setState({
                    notification: ""
                })
            },2000)
        })
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
          
          return(     
            <div  class="modal fade" id="modal-id" style={backdropStyle}>
              <div class="modal-dialog" >
                <div class="modal-content">
                  
                  <div class="modal-body">
                  <span className="login100-form-title p-b-59" style={{textAlign :"center",fontSize: "20px"}}>
                        confirm delete key
                  </span>
                  
                  <p style={{color: this.state.color, fontSize: "20px"}}>{this.state.notification}</p>
                  <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">Admin public key</span>
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

      

      handleinput(e){
        this.setState({AdminPublicKey: e.target.value})
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

    delclick = (e)=>{
        this.setState({
            id:  e.target.value
       })
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
                    <button type="button" class="fa fa-eye fa-lg" value={value.id} onClick={this.vieclick} data-toggle="modal" href='#modal-id-view' title="View history online of user"></button>
                    <button type="button" class="fa fa-trash-o fa-lg" value={value.id} onClick={this.delclick} data-toggle="modal" href='#modal-id' title="Delete this user"></button>
                   </td> 
                </tr>
            )
        })
    }




    dashboard= ()=>{
      window.location.reload();
    }

    

    render()
    {
        if(this.state.Isloading)
        {
        return(
        <div>
            {this.RenderModalDelClick()}
            {this.RenderModalViewClick()}
            <div style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
              <input type="text" style={{width: "100%"}} class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search" onChange={this.handleSearch}/>
            </div>
             
        <div className = "over-p" style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
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
            </div>
        </div>
        )
         }
        else
        {
            return(
                <div style={{textAlign: "center", marginTop: "100px"}}>
                    <img src={"https://retchhh.files.wordpress.com/2015/03/loading4.gif?w=300&h=300"} alt="loading..." style={{width: "50px", height: "50px"}}/>
                </div>
              )
        }
    }
}


export default KeyMan;