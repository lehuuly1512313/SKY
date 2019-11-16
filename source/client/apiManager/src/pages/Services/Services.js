import React, {Component} from "react";
import {Link} from "react-router-dom";
class Services extends Component{



    componentWillMount(){
      window.scrollTo(0, 0);
    }
    render(){
        return(
            <div>
            <div className="site-wrap">
       
              <div className="site-section">
                <div className="container">
                  <div className="row row-center">
                  <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="a">
                          <a href="course-single.html"><img src="servicesStyle/images/course_1.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$0</div>
                          <div className="category"><h3>Free</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "Free")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="a">
                          <a href="course-single.html"><img src="servicesStyle/images/course_1.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$1</div>
                          <div className="category"><h3>1 Month</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "1 Month")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="thumnail">
                          <a href="course-single.html"><img src="servicesStyle/images/course_2.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$2.5</div>
                          <div className="category"><h3>3 Months</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "3 Months")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="thumnail">
                          <a href="course-single.html"><img src="servicesStyle/images/course_3.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$5</div>
                          <div className="category"><h3>6 Months</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "6 Months")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="thumnail">
                          <a href="course-single.html"><img src="servicesStyle/images/course_4.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$7</div>
                          <div className="category"><h3>9 Months</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "9 Months")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="thumnail">
                          <a href="course-single.html"><img src="servicesStyle/images/course_5.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$9</div>
                          <div className="category"><h3>12 Months</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "12 Months")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="course-1-item">
                        <figure className="thumnail">
                          <a href="course-single.html"><img src="servicesStyle/images/course_6.jpg" alt="Image" className="img-fluid" /></a>
                          <div className="price">$1/1000</div>
                          <div className="category"><h3>Unlimited</h3></div>  
                        </figure>
                        <div className="course-1-content pb-4">
                          <h2>Describe</h2>
                          <div className="rating text-center mb-3">
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                            <span className="icon-star2 text-warning" />
                          </div>
                          <p className="desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.</p>
                          <p><Link to="/create-key"><button className="btn btn-primary rounded-0 px-4" onClick={()=>{localStorage.setItem("create", "Unlimited")}}>Choose this package</button></Link></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
          
            </div>
            </div>

        )
    }
}


export default Services;