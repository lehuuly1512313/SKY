import React from "react";
import "./../../App.css"

class Item extends React.Component {
    constructor (props){
      super ();
      this.state = {
        ChooseColor: "#5f5f5f28",
        clicked: false,
      };
    }

    ChooseColor = ()=>{
        if(this.state.clicked)
        {
            this.setState({
                ChooseColor: "#5f5f5f28",
                clicked: false
              })      
        }
        else
        {
            this.setState({
                ChooseColor: "green",
                clicked: true
              })    
        }
      }
    render (){
        return(
        <span className="fa fa-check-circle fa-lg" onClick={this.ChooseColor} style={{color: this.state.ChooseColor}}> </span>
    )
    }
  }

export default Item;