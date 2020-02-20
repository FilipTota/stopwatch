import React, {Component} from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      timerStarted: false,
      timerStopped: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      captures: []
    }
  }

  startTimer = (e) => {
    e.preventDefault()
    if(this.state.timerStopped) {
      this.timer = setInterval(() => {
        this.setState({
          timerStarted: true,
          timerStopped: false
        })
        if(this.state.minutes >= 59) {
          this.setState({
            hours: this.state.hours + 1,
            minutes: 0,
            seconds: 0
          })
        }
        if(this.state.seconds >= 59) {
          this.setState({
            minutes: this.state.minutes + 1,
            seconds: 0
          })
        }
        if(this.state.timerStarted) {
          this.setState({
            seconds: this.state.seconds + 1
          })
        }
      }, 1000)
    }
  }

  stopTimer = (e) => {
    e.preventDefault()
    this.setState({
      timerStarted: false,
      timerStopped: true
    })
    clearInterval(this.timer)
  }

  captureTime = (e) => {
    e.preventDefault()
    this.setState({
      captures: [...this.state.captures, `${this.state.hours}:${this.state.minutes}:${this.state.seconds}`]
    })
  }

  resetTimer = (e) => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      captures: []
    })
    this.stopTimer(e)
  }

  render() {
    return(
      <div className="container">
        <h2 className="text-center">Stopwatch</h2>
        <div className="timer-container">
          <div className="current-timer">
            {`${this.state.hours}:${this.state.minutes}:${this.state.seconds}`}
          </div>
          <div className="timer-controls">
            <button className="btn btn-success" onClick={this.startTimer}>Start timer</button>
            <button className="btn btn-warning" onClick={this.stopTimer}>Stop timer</button>
            <button className="btn btn-info" onClick={this.captureTime}>Capture time</button>
            <button className="btn btn-danger" onClick={this.resetTimer}>Reset!</button>
          </div>
          <div className="time-capture">
            <h6>Time Capture:</h6>
            {this.state.captures.map((time, i) => {
              return <code>{`Time ${i + 1}: ${time}`}</code>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App