import React from 'react';
import './tasksFilter.css';

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      return (
        <li key={name}>
          <button
            className={isActive ? 'selected' : null}
            onClick={() => onFilterChange(name)}
            type="button"
          >
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
