import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right'
  }

  render(){
    return (
      <div className="chart">

<div class="row">
   <Bar
          data={this.state.chartData}
          height="100px"
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Most use',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
 
</div>
       


      </div>
    )
  }
}

export default Chart;