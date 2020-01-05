import React from "react";
import "./../../App.css"
import API from '../../pages/Database/APICnn';


const api=new API();

class Read extends React.Component {
    constructor (props){
      super ();
      this.state = {
        mail: "fa fa-envelope-o fa-lg"
      };
    }


    componentWillMount()
    {
       
        if(this.props.read === 1)
        {
            this.setState({
                mail: "fa fa-envelope-open-o fa-lg"
            })
        }
    }

    render (){
        return(
            <i class={this.state.mail} aria-hidden="true"></i>
    )
    }
  }

export default Read;