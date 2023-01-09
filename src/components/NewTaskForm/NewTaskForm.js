import React from 'react';
import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState(() => ({
      label: e.target.value,
    }));
  };

  onSubmit = (e) => {
    const { onAddTask } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onAddTask(label);
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          value={label}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}
