import React, {Component} from "react";
import {Link} from "react-router-dom"

class HomePage extends Component{

    componentWillMount(){
        window.scrollTo(0, 0);
    }

    render(){
        return(
            <div>
              <div className="slidershow middle">
        <div className="slides">
          <input type="radio" name="r" id="r1" defaultChecked />
          <input type="radio" name="r" id="r2" />
          <input type="radio" name="r" id="r3" />
          <input type="radio" name="r" id="r4" />
          <input type="radio" name="r" id="r5" />
          <div className="slide s1">
            <img style={{position : "absolute", top: "-144px",marginTop: "-150px",height: "177%"}} src="./loginStyle/img/showcase.jpg" alt="" />
          </div>
          <div className="slide">
            <img style={{ position : "absolute", top: "-144px",marginTop: "-150px",height: "177%"}} src="./aboutStyle/2.jpg" alt="" />
          </div>
          <div className="slide">
            <img style={{position : "absolute", top: "-144px",marginTop: "-150px",height: "177%"}} src="./aboutStyle/3.jpg" alt="" />
          </div>
          <div className="slide">
            <img style={{position : "absolute", top: "-144px",marginTop: "-150px",height: "177%"}} src="./aboutStyle/4.jpg" alt="" />
          </div>
          <div className="slide">
            <img style={{position : "absolute", top: "-144px",marginTop: "-150px",height: "177%"}} src="./aboutStyle/5.jpg" alt="" />
          </div>
        </div>
        <div className="navigation">
          <label htmlFor="r1" className="bar" />
          <label htmlFor="r2" className="bar" />
          <label htmlFor="r3" className="bar" />
          <label htmlFor="r4" className="bar" />
          <label htmlFor="r5" className="bar" />
        </div>
      </div>

                <section id="showcase" className="showcase">
                <div className="container">
                    <h1>Affordable Professional Web Design</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu luctus ipsum, rhoncus semper magna. Nulla nec magna sit amet sem interdum condimentum.</p>
                </div>
                </section>
                <section id="newsletter">
                <div className="container">
                    <h1>Subscribe To Our Newsletter</h1>
                    <form>
                    <input type="email" placeholder="Enter your email..." />
                    <button type="submit" className="btn-sub">Subscribe</button>
                    </form>
                </div>
                </section>
                <div style={{width: "60%", marginLeft:"20%",boxShadow: "5px 5px 5px #666",background: "#eee",marginTop: "20px", padding: "10px 50px 10px 50px"}}>
              <div style={{textAlign: "center"}}>
                <div><img class="navigation-image" src="//cdn.jotfor.ms/assets/img/memberkit/user_guide_images/f1.png?v=0.2" style={{width: "100px", height:"100px"}} alt="Getting Started with JotForm Podo"/></div>
                <div style={{fontSize:"16px"}}>SOA User Guide / Getting Started with SOA</div>
              </div>
           
            <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/2-How-to-Create-Your-First-Web-Form">How to create a Key</a>
            </h2>
            <p class="chapterSummary">
            First-time SOA users often ask how to create a simple web form, how to set up Email Notifications, how to embed a form on a website, how to test the form to see if it's working, and how to view responses in email and JotForm Inbox.&amp;nbsp;Got a... or <Link to="/create-key" onClick={this.move}>Click here to get started</Link></p> 
            
            <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/526-How-to-Change-the-Username">How to change the password?</a>
            </h2>
            <p class="chapterSummary">
            NOTE: This guide is valid only for accounts in the Starter (FREE) plan. If your account is on a paid plan and you want to change the username, contact us here.To change the username of your JotForm account, follow the steps below.1. Go to the Profile... </p> <h2>

            <a class="chapterTitle" href="https://www.jotform.com/help/489-How-to-reset-the-password">How to reset the password?</a>
            </h2>
            <p class="chapterSummary">
            If you need help resetting your password, we can help by sending you a link to reset it.In order to get the link you need to:1. Visit Jotform's Website.&amp;nbsp;2. Click on Login button.3. Click on Forgot Password?4. Enter either the email address o... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to delete a key?</a>
            </h2>
            <p class="chapterSummary">
            NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to update your profile?</a>
            </h2>
            <p class="chapterSummary">
            NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/527-How-to-Delete-My-Account">How to use a key?</a>
            </h2>
            <p class="chapterSummary">
            NOTE: Deleting your account will delete all the forms and the form submissions owned by your account.To delete your JotForm account, follow the steps below.1. Go to the Profile section of your account.https://www.jotform.com/myaccount/profile2.&amp;n... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/46-Quick-Overview-of-Form-Fields">Introduce</a>
            </h2>
            <p class="chapterSummary">
            JotForm has pretty much any type of Form Fields you might need. Take a look at the complete list below and get a brief description of each one of them.BASIC FORM ELEMENTSHEADER: A Header briefly explains what your form is about. Use the Subheader if ... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/106-How-to-Use-Form-Templates">Package</a>
            </h2>
            <p class="chapterSummary">
            Form Templates&amp;nbsp;are the usual go-to solution of first time JotForm users. Whether you're looking for a template to get started with, a form that closely matches your requirement, or even just using it for the design and layout, templates are ... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/184-How-to-Apply-a-Theme-to-Your-Form">Create key</a>
            </h2>
            <p class="chapterSummary">
            Applying a Theme within the Form BuilderTo apply a theme to your form in the form builder, follow these steps:1. Open your form in the form builder2. Click the Form Designer icon3. Go to Themes tab and select the theme you wish to use.Applying a Them... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/420-What-s-New-in-JotForm-4-0">Docs</a>
            </h2>
            <p class="chapterSummary">
            JotForm 4.0 was built around the idea that making forms should be a breeze. The main goal is effortless form creation anytime, anywhere, and on any device with ease.You may have seen the improvements we had back when we launched V3 but the new sets o... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/408-Understanding-Your-Account-Usage-and-Limits">Contact</a>
            </h2>
            <p class="chapterSummary">
            Confused on how your account limits work? Don't worry, in this guide we got you covered. Here, we will help you understand the different limits that your account has based on the subscription or plan that you are into.First, please visit our PRICING ... </p> <h2>
            <a class="chapterTitle" href="https://www.jotform.com/help/56-Quick-overview-of-form-themes">About us</a>
            </h2>
            <p class="chapterSummary">
            If you want to know how to change the themes of your forms, click here.If you're here to just look around to see how the form's style changes with each theme applied, we hope you enjoy the tour.DefaultNova ThemePastel ThemeJot ThemeBaby BluePaper Gre... </p> <h2>

            <a class="chapterTitle" href="https://www.jotform.com/help/8-Terms-of-Use">Terms of Use</a>
            </h2>
            <p class="chapterSummary">
            Please read this Agreement carefully to ensure you understand each provision. These Terms of Service ("Terms") govern your use of JotForm, Inc. ("Company", JotForm) web site located at https://www.jotform.com (the "Site&amp;q... </p>
            
            
            </div>
            </div>

        )
    }
}


export default HomePage;