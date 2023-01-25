import Task from '../Task';
import './taskList.css';

function TaskList(props) {
  const {
    todos,
    onDelete,
    onToggleDone,
    onEdit,
    onSubmitChange,
    onStartTimer,
    onStopTimer
  } = props;
  const elements = todos.map((item) => (
    <Task
      key={item.id}
      id={item.id}
      text={item.label}
      time={item.time}
      timer={item.timer}
      status={item.status}
      createdDate={item.createdDate}
      onDelete={() => onDelete(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onEdit={() => onEdit(item.id)}
      onSubmitChange={onSubmitChange}
      onStartTimer={() => onStartTimer(item.id)}
      onStopTimer={() => onStopTimer(item.id)}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
