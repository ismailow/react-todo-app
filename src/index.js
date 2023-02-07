import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

function App() {
  const [filter, setFilter] = useState('all');
  const [todoData, setTodoData] = useState([
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
  ]);
  const [todoTimers, setTodoTimers] = useState([]);
  let taskId = 10;

  const addItem = (text, timer) => {
    const newItem = {
      label: text,
      status: 'task',
      createdDate: Date.now(),
      timer,
      id: taskId++,
    };
    setTodoData((data) => {
      const newTodoData = [newItem, ...data];
      return newTodoData;
    })
  };

  const stopTimer = (id) => {
    setTodoTimers((data) => {
      const index = todoTimers.findIndex((item) => item.id === id);
      let newTodoTimers = [...data];

      if (index !== -1) {
        clearInterval(data[index].interval);
        newTodoTimers = data.filter((item) => item.id !== id);
      }
      return newTodoTimers;
    })
  };

  const deleteTask = (id) => {
    stopTimer(id);
    setTodoData((data) => {
      const newData = data.filter((item) => item.id !== id);
      return newData;
    })
  };

  const onToggleDone = (id) => {
    stopTimer(id);
    setTodoData((data) => {
      const newData = data.map((item) => {
        if (item.id === id) {
          const newItem = {...item, status: item.status === 'task' ? 'completed' : 'task'}
          return newItem
        }
        return item;
      });
      return newData;
    })
  };

  const onEdit = (id) => {
    setTodoData((data) => {
      const newData = data.map((item) => {
        if (item.id === id) {
          const newItem = {...item, status: item.status === 'task' ? 'editing' : 'task'}
          return newItem
        }
        return item;
      })
      return newData;
    });
  };

  const onSubmitChange = (newValue, id) => {
    setTodoData((data) => {
      const newData = data.map((item) => {
        if (item.id === id) {
          const newItem = {...item, label: newValue, status: 'task'};
          return newItem;
        }
        return item;
      })
      return newData;
    });
  };

  const startTimer = (id) => {
    setTodoTimers((data) => {
      const hasTimer = data.some((item) => item.id === id);
      let newTodoTimers;

      if (!hasTimer) {
        const interval = setInterval(() => {
          setTodoData((todos) => {
            const newData = todos.map((item) => {
              if (item.id === id) {
                const newItem = {...item, timer: item.timer - 1}
                return newItem;
              }
              return item;
            })
            return newData;
          })
        }, 1000);
        const newTimer = {
          id,
          interval,
          started: true,
        }
        newTodoTimers = [...todoTimers, newTimer];
      } else {
        const index = data.findIndex((item) => item.id === id);
        if (!data[index].started) {
          newTodoTimers = data.map((item, i) => 
            i === index ? {...item, started: true} : item
          );
        } else {
          newTodoTimers = [...todoTimers];
        }
      }
      return newTodoTimers;
    })
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  };

  const onClearCompleted = () => {
    setTodoData((data) => {
      const newTodoData = data.filter((item) => item.status !== 'completed');
      return newTodoData;
    })
  };

  const filterFunc = (items) => {
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
  };

  const tasksCount = todoData.filter((item) => item.status === 'task').length;
  const visibleItems = filterFunc(todoData, filter);
  return (
    <section className="todoapp">
      <Header onAddTask={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDelete={deleteTask}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onSubmitChange={onSubmitChange}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          tasksCount={tasksCount}
          onClearCompleted={onClearCompleted}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
}

root.render(<App />);
