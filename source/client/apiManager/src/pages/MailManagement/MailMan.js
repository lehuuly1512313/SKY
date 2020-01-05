import React, {Component} from "react";
import API from '../../pages/Database/APICnn';
import { Redirect} from "react-router-dom";
import "./../../App.css"
import Item from "./Item"
import Read from "./Read"
import Reply from "./Reply"

const api=new API();

var listIDDelete = [];

class MailMan extends Component{

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
            color: "red",
            listIDDelete: [],
            redirecttoreply: false,
            
        }
    }

    componentWillMount()
    {
        api.getallmail().then(res=>{
            this.setState({
                data: res,
                fakedata: res,
                Isloading: true,
            })
        })
    }
  
  
      

      handleinput(e){
        this.setState({AdminPublicKey: e.target.value})
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
       var data = {
         id: e.target.value
       }
       api.deletemail(data).then(res=>{
        if(res.includes("succesfully"))
        {
          this.dashboard()
        }
       })
    }

    onDoubleClicked = (str)=>{
      var split = str.split('/');
      var data = {
        name: split[0],
        from: split[1],
        contents: split[2],
        telno: split[3],
        company: split[4],
        position: split[5],
        id: split[6]
      }

      localStorage.setItem("reply", JSON.stringify(data));
      this.setState({
        redirecttoreply: true
      })
      
      var data = {
        id: split[6]
      }

      api.readed(data).then(res=>{

      })
    }


    Itemclicked = (id)=>{
     
      var index = listIDDelete.indexOf(id)
      if(index !== -1)
      {
        listIDDelete.splice(index, 1);
      }
      else
      {
        listIDDelete.push(id)
      }

      this.setState({
        listIDDelete
      })
    }

    ondellist = ()=>{
      api.deletlistemail(listIDDelete).then(res=>{
        if(res.includes("done"))
        {
          this.dashboard()
        }
       })
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
                    confirm delete user
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


    renderTable=(data)=>{
        return data.map(value=>{
            var contents = value.contents;
            var slit = contents.split(' ');
            contents = slit[0]+ " " + slit[1] + " " + slit[2] + " " + slit[3]+ " " + slit[4]+ " " + slit[5]+ " "  + slit[6]+ " ...";
            return(
                <tr style={{fontWeight:"bolder"}} >
                    <td style={{ textAlign: "center"}} scope="row"><div onClick={()=>this.Itemclicked(value.id)}><Item></Item></div></td>
                    <td style={{ textAlign: "center"}}>
                      <Read read = {value.readl}></Read>
                   </td>
                    <td onClick={()=>this.onDoubleClicked(value.name+ '/' + value.from + '/' + value.contents + '/' + value.telno + '/' + value.company + "/" + value.position + "/" + value.id)}>{value.name}</td>
                    <td onClick={()=>this.onDoubleClicked(value.name+ '/' + value.from + '/' + value.contents + '/' + value.telno + '/' + value.company + "/" + value.position + "/" + value.id)}>{value.email}</td>
                    <td onClick={()=>this.onDoubleClicked(value.name+ '/' + value.from + '/' + value.contents + '/' + value.telno + '/' + value.company + "/" + value.position + "/" + value.id)}>{contents}</td>
                    <td onClick={()=>this.onDoubleClicked(value.name+ '/' + value.from + '/' + value.contents + '/' + value.telno + '/' + value.company + "/" + value.position + "/" + value.id)}>{value.company}</td>
                    <td onClick={()=>this.onDoubleClicked(value.name+ '/' + value.from + '/' + value.contents + '/' + value.telno + '/' + value.company + "/" + value.position + "/" + value.id)}>{value.position}</td>
                    <td style={{ textAlign: "center"}}>
                    <button type="button" class="fa fa-trash-o fa-lg" value={value.id} onClick={this.delclick} data-toggle="modal" href='#modal-id' title="Delete this user"></button>
                   </td>
                    <td style={{color: "green", textAlign: "center"}}>
                        <Reply reply = {value.reply}></Reply>
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
          if(this.state.redirecttoreply){
            this.setState({
              redirecttoreply: false
            })
            return(<Redirect to="/ReplyMail"></Redirect>)
          }
        return(
        <div>
            <div style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
              <input type="text" style={{width: "100%"}} class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search" onChange={this.handleSearch}/>
            </div>
            <div style={{width: "90%",  marginLeft: "5%", marginTop:"2%"}}>
            <button type="button" title="Delete List Mail" onClick={this.ondellist} style = {{border: "1px solid black", borderRadius: '5px', marginRight: "5px"}}><img width = "30px" height="30px" src="./servicesStyle/images/Recycle.png"></img></button>
            <button type="button" title="Save List Mail" style = {{border: "1px solid black", borderRadius: '5px' , marginRight: "5px"}}><img width = "30px" height="30px" src="./servicesStyle/images/Save.png"></img></button>
            <button type="button" title="Check spam mail" style = {{border: "1px solid black", borderRadius: '5px' , marginRight: "5px"}}><img width = "30px" height="30px" src="./servicesStyle/images/Spam.png"></img></button>
            <button type="button" title="None display mail" style = {{border: "1px solid black", borderRadius: '5px' , marginRight: "5px"}}><img width = "30px" height="30px" src="./servicesStyle/images/Clock.png"></img></button>
            <button type="button" title="None display mail" style = {{border: "1px solid black", borderRadius: '5px' , marginRight: "5px"}}><img width = "30px" height="30px" src="./servicesStyle/images/Tag.png"></img></button>
            </div>
        <div className = "over-p" style={{width: "90%", marginLeft: "5%", marginTop:"2%"}}>
            <table class="table table-striped table-inverse table-responsive"  style={{width: "100%",}}>
                <thead class="thead-inverse" style={{backgroundColor: "#3b5998", color: "white"}}>
                    <tr>
                        <th >Choose</th>
                        <th style={{width:"5%"}}>Status</th>
                        <th style={{width:"15%"}}>Name</th>
                        <th style={{width:"25%"}}>From</th>
                        <th style={{width:"30%"}}>Contents</th>
                        <th style={{width:"10%"}}>Company</th>
                        <th style={{width:"5%"}}>Position</th>
                        <th style={{width:"5%"}}>Action</th>
                        <th style={{width:"5%"}}>Answered</th>
                    </tr>
                    </thead>
                    <tbody id="tbodymails" > 
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


export default MailMan;