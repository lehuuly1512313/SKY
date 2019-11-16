import React, { Component } from 'react';


class Footer extends Component {
    render() {

        return (
            <footer style={{display: `${this.props.display}`}}>
            <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                <h3>Site Map</h3>
                <ul className="list-unstyled three-column">
                    <li>Dashboard</li>
                    <li>Introduce</li>
                    <li>Package</li>
                    <li>SDK</li>
                    <li>User guide</li>
                    <li>Contact</li>
                    <li>About us</li>
                </ul>
                <ul className="list-unstyled socila-list">
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                    <li><img src="http://placehold.it/48x48" style={{width: "50px", height: "50px"}} alt="" /></li>
                </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                <h3>latest Articles</h3>
                <div className="media">
                    <a href="#" className="pull-left">
                    <img src="https://www.codegrand.com/images/codegrand-logo.png" style={{width: "64px", height: "64px"}} alt="" className="media-object" />
                    </a>
                    <div className="media-body">
                    <h4 className="media-heading">Programming</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="media">
                    <a href="#" className="pull-left">
                    <img src="https://icon-library.net/images/icon-code/icon-code-9.jpg" style={{width: "64px", height: "64px"}} alt="" className="media-object" />
                    </a>
                    <div className="media-body">
                    <h4 className="media-heading">Coding</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="media">
                    <a href="#" className="pull-left">
                    <img src="https://nodetx.com/wp-content/uploads/2017/04/code_flat_icon_by_foxinflame-d9bkady.png" style={{width: "64px", height: "64px"}} alt="" className="media-object" />
                    </a>
                    <div className="media-body">
                    <h4 className="media-heading">Web design</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                </div>
                <div className="col-lg-4">
                <h3>Support</h3>
                <img className="img-thumbnail" src="http://dotnetguru.org/wp-content/uploads/2019/08/php.jpg" style={{width: "150px", height: "100px"}} alt="" />
                <img className="img-thumbnail" src="https://nguyenvanhieu.vn/wp-content/uploads/2018/10/javascript-la-gi.jpg" style={{width: "150px", height: "100px"}} alt="" />
                <img className="img-thumbnail" src="https://vnreview.vn/image/14/91/03/1491033.jpg"  style={{width: "150px", height: "100px"}} alt="" />
                <img className="img-thumbnail" src="https://img.stackshare.io/service/6755/2c45151a4a11d3a3c8e71bb34dd069d6_400x400.png"   style={{width: "150px", height: "100px"}} alt="" />
                </div>
            </div>
            </div>
            <div className="copyright text-center">
            Copyright © 2019 <span>HCMUS SoA dev Teams</span>
            </div>
            </footer>
        );
    }
}







export default Footer;
