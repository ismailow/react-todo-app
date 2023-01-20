import React from 'react';
import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (e) => {
    this.setState(() => ({
      label: e.target.value,
    }));
  };

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      seconds: Number(e.target.value),
    });
  };

  onSubmit = (e) => {
    const { onAddTask } = this.props;
    const { label, minutes, seconds } = this.state;
    const timer = minutes * 60 + seconds;
    e.preventDefault();
    onAddTask(label, timer);
    this.setState({ label: '', minutes: '', seconds: '' });
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form
        className="new-todo-form"
        onSubmit={this.onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.onSubmit(e);
          }
        }}
      >
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          value={label}
          placeholder="What needs to be done?"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinutesChange}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecondsChange}
          value={seconds}
        />
      </form>
    );
  }
}
