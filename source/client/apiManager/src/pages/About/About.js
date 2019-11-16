import React, {Component} from "react";
class About extends Component{

  componentWillMount(){
    window.scrollTo(0, 0);
  }

    render(){
        return(

  
            <div>
            <div className="site-wrap">
           <div className="container pt-5 mb-5">
                <div className="row">
                  <div className="col-lg-4">
                    <h2 className="section-title-underline">
                      <span>ApiSound History</span>
                    </h2>
                  </div>
                  <div className="col-lg-4">
                    <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, iure dolorum! Nam veniam tempore tenetur aliquam architecto, hic alias quia quisquam, obcaecati laborum dolores. Ex libero cumque veritatis numquam placeat?</p>
                  </div>
                  <div className="col-lg-4">
                    <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Nam veniam tempore tenetur aliquam
                      architecto, hic alias quia quisquam, obcaecati laborum dolores. Ex libero cumque veritatis numquam placeat?</p>
                  </div>
                </div>
              </div>
              <div className="site-section">
                <div className="container">
                  <div className="row mb-5">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <img src="./servicesStyle/images/course_4.jpg" alt="Image" className="img-fluid" /> 
                    </div>
                    <div className="col-lg-5 align-self-center">
                      <h2 className="section-title-underline mb-5">
                        <span>Why ApiSound Works</span>
                      </h2>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At itaque dolore libero corrupti! Itaque, delectus?</p>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Modi sit dolor repellat esse! Sed necessitatibus itaque libero odit placeat nesciunt, voluptatum totam facere.</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                      <img src="./servicesStyle/images/course_5.jpg" alt="Image" className="img-fluid" /> 
                    </div>
                    <div className="col-lg-5 mr-auto align-self-center order-2 order-lg-1">
                      <h2 className="section-title-underline mb-5">
                        <span>Personalized Learning</span>
                      </h2>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At itaque dolore libero corrupti! Itaque, delectus?</p>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>Modi sit dolor repellat esse! Sed necessitatibus itaque libero odit placeat nesciunt, voluptatum totam facere.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-bg style-1" style={{backgroundImage: 'url("images/hero_1.jpg")'}}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                      <span className="icon flaticon-mortarboard" />
                      <h3>Our Philosphy</h3>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "white",opacity: "0.6",}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea? Dolore, amet reprehenderit.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                      <span className="icon flaticon-school-material" />
                      <h3>Academics Principle</h3>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "white",opacity: "0.6",}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea?
                        Dolore, amet reprehenderit.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                      <span className="icon flaticon-library" />
                      <h3>Key of Success</h3>
                      <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "left",lineHeight: "25px",color: "white",opacity: "0.6",}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis delectus ea?
                        Dolore, amet reprehenderit.</p>
                    </div>
                  </div>
                </div>
              </div>



              <div className="site-section">
                <div className="container">
                  <div className="row mb-5 justify-content-center text-center">
                    <div className="col-lg-4 mb-5">
                      <h2 className="section-title-underline mb-5">
                        <span>Our Team</span>
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-5 mb-lg-5">
                      <div className="feature-1 border person text-center">
                        <img src="./servicesStyle/images/person_3.jpg" alt="Image" className="img-fluid" />
                        <div className="feature-1-content">
                          <h1 style={{color : "#00ff00",fontSize: "30px", marginTop: "-35px"}}>Phuc Lam, Le</h1>
                          <span className="position mb-3 d-block">Products Owner</span>    
                          <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "center",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>"You only live once, but if you do it right, once is enough"</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-lg-5">
                      <div className="feature-1 border person text-center">
                        <img src="./servicesStyle/images/person_2.jpg" alt="Image" className="img-fluid" />
                        <div className="feature-1-content">
                          <h1 style={{color : "#00ff00",fontSize: "30px", marginTop: "-35px"}}>Huu Ly, Le</h1>
                          <span className="position mb-3 d-block">Scrum Master</span>    
                          <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "center",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>"You've gotta dance like there's nobody watching"</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-lg-5">
                      <div className="feature-1 border person text-center">
                        <img src="./servicesStyle/images/person_2.jpg" alt="Image" className="img-fluid" />
                        <div className="feature-1-content">
                          <h1 style={{color : "#00ff00",fontSize: "30px", marginTop: "-35px"}}>Manh Linh , Dao</h1>
                          <span className="position mb-3 d-block">Developer</span>    
                          <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "center",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>"I'm selfish, impatient and a little insecure."</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-lg-5">
                      <div className="feature-1 border person text-center">
                        <img src="./servicesStyle/images/person_1.jpg" alt="Image" className="img-fluid" />
                        <div className="feature-1-content">
                          <h1 style={{color : "#00ff00",fontSize: "30px", marginTop: "-35px"}}>Ba Ky, Nguyens</h1>
                          <span className="position mb-3 d-block">Developer</span>    
                          <p style={{    margin:" 0 0 10px",fontSize: "16px",textAlign: "center",lineHeight: "25px",color: "rgb(49, 52, 50)",opacity: "0.6",}}>"Don't cry because it's over, smile because it happened"</p>
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


export default About;