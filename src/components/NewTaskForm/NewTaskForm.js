import { useState } from 'react';
import './newTaskForm.css';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const {onAddTask} = props;

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (e) => {
    const timer = minutes * 60 + Number(seconds);
    e.preventDefault();
    onAddTask(label, timer);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  const onBlur = (e) => {
    e.target.blur();
  }

  return (
    <form
      className="new-todo-form"
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit(e);
        }
        if (e.key === 'Escape') {
          onBlur(e)
        }
      }}
    >
      <input
        className="new-todo"
        onChange={onLabelChange}
        value={label}
        placeholder="What needs to be done?"
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinutesChange}
        value={minutes}
        type="number"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondsChange}
        value={seconds}
        type="number"
      />
    </form>
  );
}

export default NewTaskForm;
