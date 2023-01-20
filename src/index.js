import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

class App extends React.Component {
  state = {
    filter: 'all',
    todoData: [
      {
        label: 'Learn React',
        status: 'task',
        createdDate: Date.now(),
        timer: 100,
        id: 1,
      },
      {
        label: 'Dink coffee',
        status: 'task',
        createdDate: Date.now(),
        timer: 100,
        id: 2,
      },
      {
        label: 'Create app',
        status: 'task',
        createdDate: Date.now(),
        timer: 100,
        id: 3,
      },
    ],
  };

  id = 10;

  addItem = (text, timer) => {
    const newItem = {
      label: text,
      status: 'task',
      createdDate: Date.now(),
      timer,
      id: this.id++,
    };
    this.setState(({ todoData }) => {
      const newTodoData = [newItem, ...todoData];
      return {
        todoData: newTodoData,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const oldItem = todoData[index];
      const newValue = oldItem.status === 'task' ? 'completed' : 'task';
      const newItem = { ...oldItem, status: newValue };
      const newTodoData = [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const newTodoData = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(
        (item) => item.status !== 'completed'
      );
      return {
        todoData: newTodoData,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const oldItem = todoData[index];
      const newValue = oldItem.status === 'task' ? 'editing' : 'task';
      const newItem = { ...oldItem, status: newValue };
      const newTodoData = [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  onSubmitChange = (newValue, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const editingTask = todoData[index];
      const newTask = { ...editingTask, label: newValue, status: 'task' };
      const newTodoData = [
        ...todoData.slice(0, index),
        newTask,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  onStartTimer = (newValue, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const timerTask = todoData[index];
      const timerStart = { ...timerTask, timer: newValue };
      const newTodoData = [
        ...todoData.slice(0, index),
        timerStart,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  filterFunc(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => item.status === 'task');
      case 'completed':
        return items.filter((item) => item.status === 'completed');
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;
    const { filterFunc } = this;
    const tasksCount = todoData.filter((item) => item.status === 'task').length;
    const visibleItems = filterFunc(todoData, filter);
    return (
      <section className="todoapp">
        <Header onAddTask={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDelete={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            onSubmitChange={this.onSubmitChange}
            onStartTimer={this.onStartTimer}
          />
          <Footer
            tasksCount={tasksCount}
            onClearCompleted={this.onClearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}

root.render(<App />);
