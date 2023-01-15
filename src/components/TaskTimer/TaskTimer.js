import { Component } from 'react';

class TaskTimer extends Component {
  state = {
    timer: 0,
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = () => {
    let { timer } = this.state;
    this.interval = setInterval(() => {
      this.setState({ timer: (timer += 1) });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  renderTime = (time) => {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let secons = time % 60;
    secons = secons < 10 ? `0${secons}` : secons;
    return `${minutes}:${secons}`;
  };

  render() {
    const { timer } = this.state;
    return (
      <span className="description">
        <button
          className="icon icon-play"
          type="button"
          onClick={this.startTimer}
        />
        <button
          className="icon icon-pause"
          type="button"
          onClick={this.stopTimer}
        />
        {this.renderTime(timer)}
      </span>
    );
  }
}

export default TaskTimer;
