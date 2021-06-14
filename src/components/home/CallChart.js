import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

let visitor = {
  title: 'calls',
  legend: false,
  stepSize: '5',
  yAxes: false,
  padding: {
    top: '20',
    right: '80',
    bottom: '20',
    left: '50'
  },
  gridLines: false,
  fontSize: 16,
  fontStyle: '400',
  labels: [
    '3rd April',
    '6th April',
    '7th April',
    '8th April',
    '9th April',
    '10th April',
    '11th April'
  ],
  datasets: [
    {
      label: 'All Calls',
      fill: false,
      backgroundColor: 'rgba(249,166,9,1)',
      borderColor: 'rgba(249,166,9,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(249,166,9,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(249,166,9,1)',
      pointHoverBorderColor: 'rgba(249,166,9,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 10,
      pointHitRadius: 10,
      data: [0, 0, 0, 0, 0, 0, 0],
      options: {
        legend: {
          diplay: true
        },
        tooltips: {
          enabled: false
        }
      }
    }
  ]
}

const CallChart = ({ data, loading ,apiData}) => {
  const [visitorData, setVisitorData] = useState(visitor)
  const [currentData, setCurrentData] = useState([0, 0, 0, 0, 0, 0, 0])
  const [selectedDate, setSelectedDate] = useState(7)
  const [labels, setLabels] = useState([])

  useEffect(() => {
    //getChartLabel()
  }, [])

  useEffect(() => {
    //if (selectedDate) fetchData()
  }, [labels, selectedDate])

  useEffect(() => {
    //LoadData()
  }, [currentData])
  

  const LoadData = () => {
    let test = {
      title: 'calls',
      legend: false,
      stepSize: '5',
      yAxes: false,
      padding: {
        top: '20',
        right: '80',
        bottom: '20',
        left: '50'
      },
      gridLines: false,
      fontSize: 16,
      fontStyle: '400',
      labels: labels,
      datasets: [
        {
          label: 'All Calls',
          fill: false,
          backgroundColor: 'rgba(249,166,9,1)',
          borderColor: 'rgba(249,166,9,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(249,166,9,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(249,166,9,1)',
          pointHoverBorderColor: 'rgba(249,166,9,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 10,
          pointHitRadius: 10,
          data: currentData,
          options: {
            legend: {
              diplay: true
            },
            tooltips: {
              enabled: false
            }
          }
        }
      ]
    }

    setVisitorData(test)
  }

  const setData = calls => {
    var el = []
    currentData.map(val => {
      el.push(val)
    })

    el[selectedDate - 1] = calls

    setCurrentData(el)
    setSelectedDate(selectedDate - 1)
  }

  const fetchData = () => {
    loading(true)
    var date = getCompleteDate(selectedDate)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-leads-status-in-month?start_date=${date}&end_date=${date}`
    url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-leads-in-custom-period/${date}/${date}`
    //alert(url)
    // return

    axios
      .get(url, head)
      .then(res => {        
        if (res.data.data) {
          loading(false)
          //visitor.datasets.data[selectedDate - 1] = res.data.data.calls
          //setVisitorData(visitor)
          setData(res.data.data.all_calls)
        }
      })
      .catch(err => {
        loading(false)       
      })
  }

  const getChartLabel = () => {
    var labels = []
    var i = 7
    for (i = 7; i > 0; i--) {
      labels.push(getCurrentDate(i))
    }

    setVisitorData(visitor)
    setLabels(labels)
  }

  const getCurrentDate = date => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    dd = parseInt(dd)
    dd = dd - date
    if (dd < 10) dd = '0' + dd
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    return dd + '/' + mm
  }

  const getCompleteDate = date => {  
    return
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    dd = parseInt(dd)
    dd = dd - date
    if (dd < 10) dd = '0' + dd
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    //return dd + '/' + mm + '/' + yyyy
    return yyyy + '-' + mm + '-' + dd
  }

  return (
    <div className="chart-holder">
      <h2 className="chart-title"> {data.title} </h2>{' '}
      <div className="chart-box">
        <Line
          data={visitorData}
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
        />{' '}
      </div>{' '}
    </div>
  )
}

export default CallChart
