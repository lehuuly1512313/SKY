import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import API from '../../pages/Database/APICnn';
import Avatar from 'react-avatar';
import '../../App.css'




class Menu extends Component{

    constructor(props) {
        super(props);
       
        var about = window.location.pathname === "/about"? "alway actived":"alway";
        var Contacts = window.location.pathname === "/contacts"? "alway actived":"alway";
        var Resources = (window.location.pathname === "/products")? "alway actived":"alway";
        var products = window.location.pathname === "/introduce"? "alway actived":"alway";
        var docs = (window.location.pathname === "/docs" || window.location.pathname === '/SDK')? "alway actived":"alway";
        var Dashboard = window.location.pathname === "/dashboard"? "alway actived":"alway";;
        this.state = {
          maccount :JSON.parse(localStorage.getItem('laccount')) || '',
          mpassword: JSON.parse(localStorage.getItem('lpassword')) || '',
          user: localStorage.getItem('user'),
          facebookuser: localStorage.getItem('FacebookUser'),
          googleuser: localStorage.getItem("GoogleUser"),
          redirect: false,
          data: this.props.data,
          products,
          Dashboard,
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
          Dashboard: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }

    Resources = ()=>{
        this.setState({
            products: "alway",
            Dashboard: "alway",
          Resources: "alway actived",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }

    Contacts = ()=>{
        this.setState({
            products: "alway",
            Dashboard: "alway",
          Resources: "alway",
          Contacts: "alway actived",
          about: "alway",
          docs: "alway"
        })
    }

    about = ()=>{
        this.setState({
            products: "alway",
            Dashboard: "alway",
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
            Dashboard: "alway",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway actived"
        })
    }

    Dashboard = ()=>{
        this.setState({
            products: "alway",
            Dashboard: "alway actived",
          Resources: "alway",
          Contacts: "alway",
          about: "alway",
          docs: "alway"
        })
    }

    profile = ()=>{
        localStorage.setItem("profile", "active");
        localStorage.removeItem("change");
    }

    change = ()=>{
        localStorage.setItem("change", "active");
        localStorage.removeItem("profile");
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
                            <div id="branding" >
                                <Link to = "/dashboard">
                                <img alt = "Image" src="./signupstyle/images/logo.png" className = "logo"/>

                                </Link>
                            </div>
                            <input className = "chek" id = "chek" type = "checkbox"/>  
                            {/* <label htmlFor = "chek">1</label> */}
                            <label htmlFor = "chek" className = "menu-btn-shows" id = "menu-btn-show">
                            <i class="fa fa-bars menu-btn-show"></i>
                          </label>
                        <nav id = "togle" className = "togle2">
                        <ul htmlFor = "chek" id = "res">
                          
                            <li htmlFor = "chek" className={this.state.Dashboard} onClick={this.Dashboard} style = {{fontWeight: "bold"}}><Link to = "/dashboard">Dashboard</Link></li>

                            <li className={this.state.products} onClick={this.products} style = {{fontWeight: "bold"}}><Link to = "/introduce">Introduce</Link>
                
                            </li>
                            <li className={this.state.Resources} onClick={this.Resources} style = {{fontWeight: "bold"}}><Link to = "/products">Package</Link></li>
                           
                            <li className={this.state.docs + " docs"} onClick={this.docs} style = {{fontWeight: "bold"}}><Link to = "/docs">Docs</Link> 
                            <ul>
                                <li><Link to="/SDK">Software Development Kit (SDK)</Link></li>
                                <li><a href="gl">Learn more</a></li>
                            </ul>
                            </li>
                            <li className={this.state.Contacts} onClick={this.Contacts} style = {{fontWeight: "bold"}}><Link to = "/contacts">Contact</Link></li>
                            <li className={this.state.about} onClick={this.about} style = {{fontWeight: "bold"}}><Link to = "/about">About Us</Link> </li>
                            {/* <li id = "SDK2" className = {this.state.docs} style = {{fontWeight: "bold"}}><Link to="/SDK">SDK Template</Link></li> */}

                            <label htmlFor = "chek" id = "menu-close">
                                <i class="fa fa-times menu-close"></i> 
                            </label>
                            <div id = "btn-profile-menu" className = "alway">
                                <Link className = "btn-SDK-menu" htmlFor = "chek" to ='/SDK'>
                                SDK Template
                                </Link>
                                
                            </div>
                            <div id = "btn-profile-menu">
                                <Link htmlFor = "chek" to ={`/${name}`} onClick = {this.profile}>
                                <button  type="button" class="btn btn-success btn-profile-menu">View Your Profile</button>
                                </Link>
                                
                            </div>
                            <div id = "btn-profile-menu">
                                <Link to = {`/${link}`} onClick = {this.onClick_LogOutOrSignUp}>
                                <button type="button" class="btn btn-danger btn-profile-menu">Log out</button>
                                </Link>                               
                            </div>
                            



                            
                        </ul>
                        </nav>
                        {/* <div className = "toggle"><i className="fa fa-bars menu"></i></div> */}
                        {this.RenderRedirect()}
                        <div className = "dropdown">
                            <Avatar src= {avatar} size="50"  round = {true} className = "avatar-header" style ={{marginTop: '5px'}}/>
                                <div class="dropdown-content">
                                    <Link to ={`/${name}`} className = "Link" onClick = {this.profile}><span><i class={iconlogin_profile} aria-hidden="true"></i>{"  "}{name}</span></Link>
                                    <Link to = {`/${link}`} className = "Link"><span onClick = {this.onClick_LogOutOrSignUp}><i class={iconsingup_logout} aria-hidden="true"></i>{"  "}{log_out}</span></Link>
                                </div>
                           </div>
                           

                          
                            {/* <span id = "btn-menu-hidden" ><i class="fa fa-bars fa-menu-hidden" aria-hidden="true"></i></span>
                            <div className= "sticky-header-show-nobackground"></div>    */}


                    </div>

                </div>
        )
    }
}


export default Menu;