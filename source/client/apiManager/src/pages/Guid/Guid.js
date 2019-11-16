import React, {Component} from "react";

class Guid extends Component{
    constructor(props){
        super(props);
        this.state={
            content: "",
            video: "",
        }
    }

    render()
    {
        
        return(
            <div style={{textAlign:"center"}}>
                 <p>{this.state.content}</p>
                    <video style={{width:"50%" }} controls>
                        <source src={this.state.video} type="video/mp4"/>
                        <source src={this.state.video} type="video/ogg"/>
                    Your browser does not support HTML5 video.
                </video>
            </div>
        )
    }
}
export default Guid;