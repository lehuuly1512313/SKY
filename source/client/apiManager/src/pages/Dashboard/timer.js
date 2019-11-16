import React, {Component} from "react";


class timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: this.props.sec };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    if(this.state.sec === 0)
    {
      this.setState({
        seconds: this.props.sec
      })
    }
  }

  startTimer = ()=> {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    //   if(this.state.time.s === 0)
    //   {
    //       return (
    //           <div>Check you email and enter code you recived</div>
    //       )
    //   }
    // return(
    //   <div>
    //        <div class="row">
    //          <button onClick = {this.startTimer}> STart</button>
    //                 <div class="col-sm-6">Please waiting for send mail: </div>
    //                 <div class="col-sm-6"> <label className = "timer-span">{this.state.time.s}</label></div>
    //         </div>
    //   </div>
    // );
    return(
      <div>
        m: {this.state.time.m} s: {this.state.time.s}
      </div>
    )
  }
}

export default timer;