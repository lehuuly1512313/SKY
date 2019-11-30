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
        soa.CnnTrans("f25c17d165c37ab3a509daa80c1827273511cc6b46bdbb20157510891582521","hello").then(res=>{
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
