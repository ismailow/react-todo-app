import Task from '../Task';
import './taskList.css';

function TaskList(props) {
  const { todos, onDelete, onToggleDone } = props;
  const elements = todos.map((item) => (
    <Task
      key={item.id}
      text={item.label}
      status={item.status}
      createdDate={item.createdDate}
      onDelete={() => onDelete(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
