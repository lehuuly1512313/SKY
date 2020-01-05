import React from "react";
import "./../../App.css"
import API from '../../pages/Database/APICnn';


const api=new API();

class Reply extends React.Component {
    constructor (props){
      super ();
      this.state = {
        mail: "none"
      };
    }


    componentWillMount()
    {
        if(this.props.reply === 1)
        {
            this.setState({
                               mail: "block"
                           })
        }
    }

    render (){
        return(
            <i class="fa fa-reply fa-lg" style={{color: "green", display: this.state.mail }} aria-hidden="true"></i>
    )
    }
  }

export default Reply;