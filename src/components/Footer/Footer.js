import TasksFilter from '../TasksFilter';
import './footer.css';

function Footer(props) {
  const { tasksCount, onFilterChange, filter, onClearCompleted } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <TasksFilter
        onFilterChange={onFilterChange}
        filter={filter}
      />
      <button
        className="clear-completed"
        onClick={onClearCompleted}
        type="button"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
