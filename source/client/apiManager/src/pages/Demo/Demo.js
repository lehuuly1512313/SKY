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
        soa.CnnTrans("4c908551b6ac38c2273d686bd57616f5890c46eefd96c9f515732960640926","hello").then(res=>{
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
