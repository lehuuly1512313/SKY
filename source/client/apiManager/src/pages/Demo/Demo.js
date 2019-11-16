import React, {Component} from "react";
import SOA from '../Database/SOA';

const soa = new SOA();


class Demo extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            value: null,
            msg: "",
        }
    }

    componentWillMount()
    {
        window.scrollTo(0, 0);
    }

    componentDidMount()
    {
        soa.CnnTrans("59ccc0ebcf3923adc1aa81a80fd69103da78e0f50b0d814715738251338601","hello").then(res=>{
            this.setState({
                value: res.vie,
                msg: res.msg
            })
        })
    }

    render()
    {
        return(
            <div>
            <div>{this.state.value}</div>
            <div>{this.state.msg}</div>
            </div>
        )
    }
}

export default Demo;
