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
        soa.CnnTrans("43be9c3c72748288ae1de308fa7c1c082a3af0400a16407d15729740209176","hello").then(res=>{
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
