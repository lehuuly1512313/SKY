import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import API from '../../pages/Database/APICnn';
import Avatar from 'react-avatar';
import '../../App.css'
const api = new API();

class Menu extends Component{

    constructor(props) {
        super(props);
        var about = window.location.pathname === "/about"? "alway actived":"alway";
        var Contacts = window.location.pathname === "/contacts"? "alway actived":"alway";
        var Resources = window.location.pathname === "/products"? "alway actived":"alway";
        var Create_Key = window.location.pathname === "/create-key"? "alway actived":"alway";
        var products = window.location.pathname === "/introduce"? "alway actived":"alway";
        var docs = window.location.pathname === "/docs"? "alway actived":"alway";
        this.state = {
          maccount :JSON.parse(localStorage.getItem('laccount')) || '',
          mpassword: JSON.parse(localStorage.getItem('lpassword')) || '',
          user: localStorage.getItem('user'),
          facebookuser: localStorage.getItem('FacebookUser'),
          googleuser: localStorage.getItem("GoogleUser"),
          redirect: false,
          data: this.props.data,
          products,
          Create_Key,
          Resources,
          Contacts,
          about,
          docs
        };
      }
      
    onClick_LogOutOrSignUp = ()=>{
        if(this.state.user || this.state.facebookuser || this.state.googleuser)
        {
        localStorage.clear();
        this.setState({
            redirect: true,
            
        })
        localStorage.setItem("logout", true);
    }
    }


    RenderRedirect = ()=>{
        if(this.state.redirect)
          {
              return <Redirect to = '/'></Redirect>
            }
      }

    products = ()=>{
        this.setState({
            products: "alway actived",
          Create_Key: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }
    Create_Key = ()=>{
        this.setState({
            products: "alway",
          Create_Key: "alway actived",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }

    Resources = ()=>{
        this.setState({
            products: "alway",
          Create_Key: "alway",
          Resources: "alway actived",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }

    Contacts = ()=>{
        this.setState({
            products: "alway",
          Create_Key: "alway",
          Resources: "alway",
          Contacts: "alway actived",
          about: "alway",
          docs: "alway"
        })
    }

    about = ()=>{
        this.setState({
            products: "alway",
          Create_Key: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway actived",
          docs: "alway"
        })
    }

    docs = ()=>
    {
        this.setState({
            products: "alway",
          Create_Key: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway  actived"
        })
    }

    Dashboard = ()=>{
        this.setState({
            products: "alway",
          Create_Key: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }


    render(){
        var name = 'Login';
        var log_out = 'Sign Up';
        var link = 'resgister';
        var iconlogin_profile = "fa fa-sign-in";
        var iconsingup_logout = "fa fa-user-plus";
        var substring = '';
        var avatar = './servicesStyle/images/avatar.png';

        if(this.state.facebookuser)
        {
            log_out = 'Log out';
            iconsingup_logout = "fa fa-sign-out";
            link = '';
            name = localStorage.getItem('FacebookName');
            iconlogin_profile = "fa fa-facebook-official";
            avatar = localStorage.getItem('FacebookPicture');
        }

        if(this.state.googleuser)
        {
            log_out = 'Log out';
            iconsingup_logout = "fa fa-sign-out";
            link = '';
            name = localStorage.getItem('GoogleName');
            iconlogin_profile = "fa fa-google";
            avatar = localStorage.getItem('GooglePicture');
        }
       
        if(this.state.user)
        {
            substring = this.state.user;
            log_out = 'Log out';
            iconsingup_logout = "fa fa-sign-out";
            link = '';
            Object.entries(this.state.data).map(([key,value],i)=>{
                if(value.account === substring)
                {
                    name = value.name;
                    iconlogin_profile = "fa fa-user";
                    avatar = value.avatar;
                }
            });
        }

        return(
                
                <div id="padding-sticky" className="header" style = {{display: `${this.props.display}`}}>
                    <div id="sticky-header" >
                        <Link to = "/">
                        <div id="branding" >
                            {/* <img alt = "Image" src="https://www.hackerrthank.com/wp-content/uploads/2018/08/hackerrank_logo.png" className="img-responsive" /> */}
                            <h2 style={{marginTop:"15px", color: "#3b5998", fontWeight: "bold"}} onClick = {this.Dashboard}>Dashboard</h2>
                        </div>
                        </Link>
                        <nav id = "togle">
                        <ul id = "res">
                            <li className={this.state.products} onClick={this.products}><Link to = "/introduce">Introduce</Link>
                
                            </li>
                            <li className={this.state.Resources} onClick={this.Resources}><Link to = "/products">Package</Link></li>
                            <li className={this.state.Create_Key} onClick={this.Create_Key}><Link to = "/create-key">Create key</Link></li>
                            <li className={this.state.docs} onClick={this.docs}><Link to = "/docs">Docs</Link> 
                            <ul>
                                <li><a href="gl">Software Development Kit (SDK)</a></li>
                                <li><a href="gl">Learn more</a></li>
                            </ul>
                            </li>
                            <li className={this.state.Contacts} onClick={this.Contacts}><Link to = "/contacts">Contact</Link></li>
                            <li className={this.state.about} onClick={this.about}><Link to = "/about">About Us</Link> </li>
                            
                            
                        </ul>
                        </nav>
                        <div className = "toggle"><i className="fa fa-bars menu"></i></div>
                        {this.RenderRedirect()}
                        <div className = "dropdown">
                            <Avatar src= {avatar} size="50"  round = {true} className = "avatar-header" style ={{marginTop: '5px'}}/>
                                <div class="dropdown-content">
                                    <Link to ={`/${name}`} className = "Link"><span><i class={iconlogin_profile} aria-hidden="true"></i>{"  "}{name}</span></Link>
                                    <Link to = "/change-password" className = "Link"><span ><i class={iconsingup_logout} aria-hidden="true"></i>{"  "}{"Change password"}</span></Link>
                                    <Link to = {`/${link}`} className = "Link"><span onClick = {this.onClick_LogOutOrSignUp}><i class={iconsingup_logout} aria-hidden="true"></i>{"  "}{log_out}</span></Link>
                                </div>
                           </div>
                            <span id = "btn-menu-hidden" ><i class="fa fa-bars fa-menu-hidden" aria-hidden="true"></i></span>
                            <div className= "sticky-header-show-nobackground"></div>   
                    </div>

                </div>
        )
    }
}


export default Menu;