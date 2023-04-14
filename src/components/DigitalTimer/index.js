// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeLimitInSec: 0,
  timeLimitInMin: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickMinusButton = () => {
    const {timeLimitInMin} = this.state

    if (timeLimitInMin > 1) {
      this.setState(prevState => ({
        timeLimitInMin: prevState.timeLimitInMin - 1,
      }))
    }
  }

  onClickPlusButton = () => {
    this.setState(prevState => ({
      timeLimitInMin: prevState.timeLimitInMin + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitInMin, timeLimitInSec} = this.state
    const isTimerCompleted = timeLimitInSec === timeLimitInMin * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeLimitInSec: prevState.timeLimitInSec + 1,
      }))
    }
  }

  onClickStartOrPauseButton = () => {
    const {isTimerRunning, timeLimitInSec, timeLimitInMin} = this.state
    const isTimerCompleted = timeLimitInSec === timeLimitInMin * 60

    if (isTimerCompleted) {
      this.setState({timeLimitInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickResetBtn = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitInMin, timeLimitInSec} = this.state
    const totalRemainingSeconds = timeLimitInMin * 60 - timeLimitInSec
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timeLimitInMin, timeLimitInSec} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    const isButtonsDisabled = timeLimitInSec > 0

    const startOrPauseIconUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const startOrPauseText = isTimerRunning ? 'Pause' : 'Start'
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-content-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div>
            <div className="timer-controller-container">
              <div className="button-text-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onClickStartOrPauseButton}
                >
                  <img
                    src={startOrPauseIconUrl}
                    className="icons"
                    alt={startOrPauseAltText}
                  />
                  <p className="button-text">{startOrPauseText}</p>
                </button>
              </div>
              <div className="button-text-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onClickResetBtn}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icons"
                    alt="reset icon"
                  />
                  <p className="button-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-time-para">Set Timer limit</p>
            <div className="limit-change-container">
              <button
                type="button"
                className="minus-button"
                onClick={this.onClickMinusButton}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <div className="time-limit-container">
                <p className="time-limit-text">{timeLimitInMin}</p>
              </div>
              <button
                type="button"
                className="plus-button"
                onClick={this.onClickPlusButton}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
