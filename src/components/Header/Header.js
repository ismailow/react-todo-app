import NewTaskForm from '../NewTaskForm';

function Header(props) {
  const { onAddTask } = props;
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddTask={onAddTask} />
    </header>
  );
}

export default Header;
