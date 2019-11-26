import React, {Component} from "react";
import Scroll from "react-scroll";

var Link = Scroll.Link;
var Element = Scroll.Element;
class Guid extends Component{
    constructor(props){
        super(props);
        this.state={
            content: "",
            video: "",
        }
    }

    render() {
        return (
          <div>    
            <h2 style={{margin:"20px"}}>Hướng dẫn sử dụng</h2>
            <Link
              activeClass="active"
              to="firstInsideContainer"
              spy={true}
              smooth={true}
              duration={250}
              offset={-80}
              style={{ display: "block", margin: "10px",color:"blue",textDecoration:"underline" }}
            >
              <ul>1.Đăng ký</ul>
            </Link>
    
            <Link
              activeClass="active"
              to="secondInsideContainer"
              spy={true}
              smooth={true}
              duration={250}
              offset={-80}
              style={{ display: "block", margin: "10px",color:"blue",textDecoration:"underline" }}
            >
              <ul>2.Đăng nhập</ul>
            </Link>
            <Link
              activeClass="active"
              to="thirdInsideContainer"
              spy={true}
              smooth={true}
              duration={250}
              offset={-80}
              style={{ display: "block", margin: "10px",color:"blue",textDecoration:"underline" }}
            >
              <ul>3.Tạo key</ul>
            </Link>
            <Link
              activeClass="active"
              to="fourInsideContainer"
              spy={true}
              smooth={true}
              duration={250}
              offset={-80}
              style={{ display: "block", margin: "10px",color:"blue",textDecoration:"underline" }}
            >
              <ul>4.Đổi mật khẩu</ul>
            </Link>


        
             <Element
                id="firstInsideContainer"
                style={{
                    margin:"20px",
                }}
              >
                <h4>1. Đăng ký</h4>
                <p>_ Nhấn vào nút sign up</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture6.png"/>
                <p>_ Khách hàng điền thông tin và nhấn vào nút continue</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture1.png"/>
                <div style={{textAlign:"center",margin:"20px"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/wiOvK2BtgZ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Element>
              <Element
                id="secondInsideContainer"
                style={{
                    margin:"20px",
                }}
              >
                <h4>2. Đăng nhập</h4>
                <p>_ Khách hàng nhập tên tài khoản và nhấn vào nút sign in</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture2.png"/>
                <div style={{textAlign:"center",margin:"20px"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/wiOvK2BtgZ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Element>
              <Element
                id="thirdInsideContainer"
                style={{
                    margin:"20px",
                }}
              >
                <h4>3. Tạo key</h4>
                <p>_ Nhập đủ thông tin và nhấp vào nút create trong trang create-key</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture7.png"/>
                <p>_ Khách hàng nhận key</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture3.png"/>
                <div style={{textAlign:"center",margin:"20px"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/wiOvK2BtgZ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Element>
              <Element
                id="fourInsideContainer"
                style={{
                    margin:"20px",
                }}
              >
                <h4>4. Đổi mật khẩu</h4>
                <p>_ Chọn tab change password</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture4.png"/>
                <p>_ Thay đổi password và nhấn vào nút change để xác nhận</p>
                    <img style={{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"20px",marginTop:"20px"}} alt = "Image" src="./guildImage/Picture5.png"/>
                <div style={{textAlign:"center",margin:"20px"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/wiOvK2BtgZ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Element>
    
           
          </div>
        );
      }
    }
export default Guid;