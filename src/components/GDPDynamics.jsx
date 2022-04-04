import "./GDPDynamics.scss"
import EChart from "./EChart"

const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

function GDPDynamics() {
    return (
        <div className="GDP-dynamics">
            <EChart option={option} />
        </div>
    )
}

export default GDPDynamics
