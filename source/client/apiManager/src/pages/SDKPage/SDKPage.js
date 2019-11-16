import React, {Component} from "react";



class SDKPage extends Component{
  

    render(){
        let singleUp="{";
        // let singleDown="}"
        let more_stick="<"
        return(
            <div>
            <div class="row space">
            <div class="col-md-3 col-centered">
                    <h3 class="colorgrey">SDK FOR JAVASCRIPT LANGUAGE (REACTJS LIB)</h3>
                    <div>React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.
                    </div>
                    <div class="space2">
                    JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.
                    </div>
            </div>
            <div class="col-md-8">
                <div class="ex2">
                        LIVE JSX EDITOR
                </div>
                    <div class="ex1">
                        <div>
                        <span class="blue mr-l-50 fw">const</span> <span class="green fw">express =</span> <span class="yellow fw">require</span> <span class="white fw">(</span><span className="orange fw">'express'</span> <span className="white fw">);</span><br></br>
                        <span class="blue mr-l-50 fw">const</span> <span class="green fw">app =</span> <span class="yellow fw">express</span> <span class="white fw">();</span><br></br>
                        <span class="blue mr-l-50 fw">let</span> <span class="green fw">apiCall =</span> <span class="yellow fw">require</span> <span class="white fw">(</span><span className="orange fw">'soundApi'</span> <span className="white fw">);</span><br></br>
                        <br></br>
                        <span class="blue mr-l-50 fw">let</span> <span class="green fw">key =</span> <span className="orange fw">"your_key"</span><br></br>
                        <span class="blue mr-l-50 fw">let</span> <span class="green fw">word =</span> <span className="orange fw">"your_word"</span><br></br>
                        <span class="blue mr-l-50 fw">let</span> <span class="green fw">url =</span> <span className="orange fw">"http://soundapi.com.vn"</span><br></br>
                        <br></br>
                        <span className="banana mr-l-50 fw">// started call api</span><br></br>
                        <span className="green mr-l-50 fw">app</span> <span className="white fw">.</span> <span className="yellow fw">(</span><span className="orange fw">'/'</span> <span className="white">, (</span>
                        <span className="blue fw">req,res</span><span className="white fw">)</span> <span className="blue fw">=></span> <span className="white fw">{`${singleUp}`}</span>  <br></br>
                        <span className="blue fw mr-l-80">res</span> <span className="white fw">.</span><span className="yellow fw">send</span><span className="white fw">(</span> <span className="blue fw">apiCall</span>
                        <span className="white fw">(</span> <span className="blue fw">url</span> <span className="white fw">,</span> <span className="blue fw">key</span> <span className="white fw">,</span> <span className="blue fw">word</span> <span className="white fw">)</span> <span className="white fw">)</span> 
                        <br></br>
                        <span className="white fw mr-l-50">})</span>             
                        </div>
                    </div>
            </div>
        </div>

<div class="row space">
<div class="col-md-3 col-centered">
        <h3 class="colorgrey">SDK FOR PHP LANGUAGE</h3>
        <div>React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.
        </div>
        <div class="space2">
        JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.
        </div>
</div>
<div class="col-md-8">
    <div class="ex2">
            LIVE JSX EDITOR
    </div>
        <div class="ex1">
                <div>
                <span className="yellow mr-l-50 fw">{`${more_stick}`}?php </span>             

                <span className="blue fw">include </span><span className="orange fw">  "soundapi" </span>
                

                <span className="yellow  fw">?></span>                 <br></br>        
                <br></br>  
                <span className="banana mr-l-50 fw">// started call api</span><br></br>
            
                <span className="yellow mr-l-50 fw">{`${more_stick}`}?php</span>             
                <br></br>
                <span className="blue mr-l-80 fw">echo</span><span className="orange fw">  "hello word"</span><span className="white  fw"> ;</span>
                
                <br></br>
                <span className="yellow mr-l-50 fw">?></span>             

                </div>
        </div>
</div>
</div>

<div class="row space">
            <div class="col-md-3 col-centered">
                    <h3 class="colorgrey">SDK FOR ASP.NET LANGUAGE</h3>
                    <div>React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.
                    </div>
                    <div class="space2">
                    JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.
                    </div>
            </div>
            <div class="col-md-8">
                <div class="ex2">
                        LIVE JSX EDITOR
                </div>
                    <div class="ex1">
                            <div>
                                <span class="blue mr-l-50 fw">using</span>  <span class="yellow fw">  System</span> <span className="white fw">;</span><br></br>
                                <span class="blue mr-l-50 fw">using</span>  <span class="yellow fw">  System.Collections.Generic</span> <span className="white fw">;</span><br></br>
                                <span class="blue mr-l-50 fw">using</span>  <span class="yellow fw">  System.Linq</span> <span className="white fw">;</span><br></br>
                                <span class="blue mr-l-50 fw">using</span>  <span class="yellow fw">  System.Text</span> <span className="white fw">;</span><br></br>
                                <br></br>
                                <span className="banana mr-l-50 fw">// started call api</span><br></br>
                                <span class="blue mr-l-50 fw">namespace</span> <span class="orange fw">SoundApi</span><br></br>
                                <span class="white mr-l-50 fw">{`${singleUp}`}</span><br></br>
                                <span class="blue mr-l-80 fw">class </span> <span class="orange fw"> runApi</span> <br></br>
                                <span class="white mr-l-80  fw">{`${singleUp}`}</span><br></br>
                                <span class="blue mr-l-100 fw">public static void </span> <span class="orange fw">Main</span><span className="white fw">()</span><br></br>
                                <span class="white mr-l-100  fw">{`${singleUp}`}</span><br></br>
                                <span className="orange mr-l-120 fw">System.Console.WriteLine</span><span className="white fw">(</span><span className="banana fw">"Hello World"</span><span className="white fw">);</span><br></br>
                                <span className="white fw mr-l-100">}</span><br></br>
                                <span className="white fw mr-l-80">}</span><br></br>
                                <span className="white fw mr-l-50">}</span><br></br>


                                
                            </div>
                    </div>
            </div>

        
        </div>
        <div class="row space">
            <div class="col-md-3 col-centered">
                    <h3 class="colorgrey">SDK FOR JAVA LANGUAGE (JEE)</h3>
                    <div>React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.
                    </div>
                    <div class="space2">
                    JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.
                    </div>
            </div>
            <div class="col-md-8">
                <div class="ex2">
                        LIVE JSX EDITOR
                </div>
                    <div class="ex1">
                            <div>
                                <span class="blue mr-l-50 fw">Package</span>  <span class="yellow fw">System</span> <span className="white fw">;</span><br></br>
                                <span class="blue mr-l-50 fw">Package</span>  <span class="yellow fw"> SoundApi</span> <span className="white fw">;</span><br></br>
                                <br></br>
                                <span className="banana mr-l-50 fw">// started call api</span><br></br>
                                <span class="blue mr-l-50 fw">public class</span> <span class="orange fw">SoundApi</span><br></br>
                                <span class="white mr-l-50 fw">{`${singleUp}`}</span><br></br>
                                <span class="blue mr-l-80 fw">public static void </span> <span class="orange fw"> main</span> <span className="white fw">(</span>
                                <span className="yellow fw">String[] args</span> <span className="white fw">)</span><br></br>
                                <span class="white mr-l-80  fw">{`${singleUp}`}</span><br></br>
                                <span className="orange mr-l-100 fw">System.out.println</span><span className="white fw">(</span><span className="banana fw">"Hello World"</span><span className="white fw">);</span><br></br>
                                <span className="white fw mr-l-80">}</span><br></br>
                                <span className="white fw mr-l-50">}</span><br></br>


                                
                            </div>
                    </div>
            </div>

        
        </div>

        </div>
        )
    }
}


export default SDKPage;

