import './tasksFilter.css';

function TasksFilter(props) {
  const { filter, onFilterChange } = props;
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
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

export default TasksFilter;
