import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

import moment from 'moment'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const Chart = ({ date, loading, apiData }) => {


  useEffect(() => {
   const dataOne = {
    title: 'all activities',
    legend: true,
    stepSize: '10',
    yAxes: true,
    padding: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    fontSize: 14,
    fontStyle: '600',
    gridLines: true,
    labels: apiData.labelArray,
    datasets: [
      {
        label: 'All Events',
        fill: false,
        backgroundColor: 'rgba(31,133,254,1)',
        borderColor: 'rgba(31,133,254,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(31,133,254,1)',
        pointHoverBorderColor: 'rgba(31,133,254,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.allEvents,
        options: {
          tooltips: {
            mode: 'point'
          }
        }
      },
      {
        label: 'All calls',
        fill: false,
        backgroundColor: 'rgba(211, 84, 0, 1)',
        borderColor: 'rgba(211, 84, 0, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(211, 84, 0, 1)',
        pointHoverBorderColor: 'rgba(211, 84, 0, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.allCalls
      },
      {
        label: 'All message',
        fill: false,
        backgroundColor: 'rgba(102,102,102,1)',
        borderColor: 'rgba(102,102,102,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(102,102,102,1)',
        pointHoverBorderColor: 'rgba(102,102,102,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.allMessage
      },
      {
        label: 'Schedule Call',
        fill: false,
        backgroundColor: 'rgb(186,85,211)',
        borderColor: 'rgb(186,85,211)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(186,85,211)',
        pointHoverBorderColor: 'rgb(186,85,211)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.ScheduleCall
      },
      {
        label: 'Successfull Call',
        fill: false,
        backgroundColor: 'rgba(4, 147, 114, 1)',
        borderColor: 'rgba(4, 147, 114, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(4, 147, 114, 1)',
        pointHoverBorderColor: 'rgba(4, 147, 114, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.successfullCalls
      },
      {
        label: 'Failed Call',
        fill: false,
        backgroundColor: 'rgb(128,0,0)',
        borderColor: 'rgb(128,0,0)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(128,0,0)',
        pointHoverBorderColor: 'rgb(128,0,0)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: apiData.failedCalls
      }
    ]
  }

  setChartData(dataOne)

  },[apiData]);

  const data = {
    title: 'all activities',
    legend: true,
    stepSize: '10',
    yAxes: true,
    padding: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    fontSize: 14,
    fontStyle: '600',
    gridLines: true,
    labels: ['', 'March'],
    datasets: [
      {
        label: 'All Events',
        fill: false,
        backgroundColor: 'rgba(31,133,254,1)',
        borderColor: 'rgba(31,133,254,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(31,133,254,1)',
        pointHoverBorderColor: 'rgba(31,133,254,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,3,4,5,6],
        options: {
          tooltips: {
            mode: 'point'
          }
        }
      },
      {
        label: 'All calls',
        fill: false,
        backgroundColor: 'rgba(41,128,2,1)',
        borderColor: 'rgba(41,128,2,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(41,128,2,1)',
        pointHoverBorderColor: 'rgba(41,128,2,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,1,2,3]
      },
      {
        label: 'All message',
        fill: false,
        backgroundColor: 'rgba(102,102,102,1)',
        borderColor: 'rgba(102,102,102,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(102,102,102,1)',
        pointHoverBorderColor: 'rgba(102,102,102,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,3,4,5,6]
      },
      {
        label: 'Schedule Call',
        fill: false,
        backgroundColor: 'rgba(59,89,153,1)',
        borderColor: 'rgba(59,89,153,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(59,89,153,1)',
        pointHoverBorderColor: 'rgba(59,89,153,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,3,4,5,6]
      },
      {
        label: 'Successfull Call',
        fill: false,
        backgroundColor: 'rgba(59,89,153,1)',
        borderColor: 'rgba(59,89,153,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(59,89,153,1)',
        pointHoverBorderColor: 'rgba(59,89,153,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,3,4,5,6]
      },
      {
        label: 'Failed Call',
        fill: false,
        backgroundColor: 'rgba(59,89,153,1)',
        borderColor: 'rgba(59,89,153,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(59,89,153,1)',
        pointHoverBorderColor: 'rgba(59,89,153,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 2,
        data: [0,3,4,5,6]
      }
    ]
  }

  const [chartData, setChartData] = useState(data)
  const [labelDates, setLabelDates] = useState([])
  const [startDates, setStartDates] = useState([])
  const [endDates, setEndDates] = useState([])

  const [events, setEvents] = useState([])
  const [allCalls, setAllCalls] = useState([])
  const [messages, setMessages] = useState([])
  const [upcommingCalls, setUpcommingCalls] = useState([])
  const [unsuccessCalls, setUnsuccessCalls] = useState([])
  const [scheduleCalls, setScheduleCalls] = useState([])

  const [index, setIndex] = useState(-1)

  // useEffect(() => {
  //   getMonths()
  //   if (apiData) {
  //     setData(apiData)
  //   }
  // }, [date, apiData])

  useEffect(() => {
    if (
      events.length == index + 1 &&
      events.length == allCalls.length &&
      allCalls.length == messages.length &&
      upcommingCalls.length == messages.length &&
      unsuccessCalls.length == messages.length &&
      scheduleCalls.length == messages.length
    )
      LoadData()
  }, [
    events,
    allCalls,
    messages,
    upcommingCalls,
    unsuccessCalls,
    scheduleCalls
  ])

  const LoadData = () => {
    // setChartData(dataNew)
    setIndex(index + 1)
  }

  return (
    <div className="chart-holder">
      <h2 className="chart-title"> CHART</h2>{' '}
      <div className="chart-box">
        <Line
          data={chartData}
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
              pointRadius: 0,
              enabled: true,
              mode: 'point'
            },
            responsive: true
          }}
        />{' '}
      </div>{' '}
    </div>
  )
}

export default Chart
