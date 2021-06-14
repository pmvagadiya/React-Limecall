import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ data }) => {
  return (
    <div className="chart-holder">
      <h2 className="chart-title">{data.title}</h2>
      <div className="chart-box">
        <Line
          data={data}
          options={{
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: data.padding.top,
                right: data.padding.right,
                bottom: data.padding.bottom,
                left: data.padding.left
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    drawTicks: true
                  },
                  ticks: {
                    display: true,
                    fontSize: data.fontSize,
                    fontStyle: data.fontStyle,
                    fontColor: '#000',
                    fontFamily: 'Gibson Regular',
                    beginAtZero: true,
                    callback: function(tick) {
                      let b = ''
                      let c = ''

                      if (tick.toString().includes('3rd')) {
                        b = '3ʳᵈ'
                        c = '3rd'
                      } else if (tick.toString().includes('4th')) {
                        b = '4ᵗʰ'
                        c = '4th'
                      } else if (tick.toString().includes('5th')) {
                        b = '5ᵗʰ'
                        c = '5th'
                      } else if (tick.toString().includes('6th')) {
                        b = '6ᵗʰ'
                        c = '6th'
                      } else if (tick.toString().includes('7th')) {
                        b = '7ᵗʰ'
                        c = '7th'
                      } else if (tick.toString().includes('8th')) {
                        b = '8ᵗʰ'
                        c = '8th'
                      } else if (tick.toString().includes('9th')) {
                        b = '9ᵗʰ'
                        c = '9th'
                      } else if (tick.toString().includes('10th')) {
                        b = '10ᵗʰ'
                        c = '10th'
                      }
                      return tick.toString().replace(c, b)
                    }
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: data.gridLines,
                    drawTicks: true
                  },
                  ticks: {
                    display: data.yAxes,
                    fontColor: '#000',
                    fontFamily: 'Gibson Regular',
                    beginAtZero: true,
                    padding: 10,
                    fontStyle: '600',
                    stepSize: data.stepSize
                  }
                }
              ]
            },
            legend: {
              display: data.legend,
              position: 'right',
              labels: {
                fontSize: 16,
                fontColor: '#000',
                boxWidth: 60,
                boxHeight: 80,
                padding: 15
              }
            },
            tooltips: {
              enabled: true,
              mode: 'point'
            },
            responsive: true
          }}
        />
      </div>
    </div>
  )
}

export default Chart
