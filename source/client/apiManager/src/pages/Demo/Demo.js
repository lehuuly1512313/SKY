import React, {Component} from "react";
import SOA from '../Database/SOA';

const soa = new SOA();


class Demo extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            value: null
        }
    }

    componentWillMount()
    {
        window.scrollTo(0, 0);
    }

    componentDidMount()
    {
        soa.CnnTrans("3eacf2f7485ff28054a0075cbd9b955a1138643694b4fde8157303674195912","hello").then(res=>{
            this.setState({
                value: res.vie
            })
        })
    }

    render()
    {
        return(
            <div>{this.state.value}</div>
        )
    }
}

export default Demo;
