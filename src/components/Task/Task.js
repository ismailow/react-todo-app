import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    id: this.props.id,
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.text,
  };

  renderTime = (time) => {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let secons = time % 60;
    secons = secons < 10 ? `0${secons}` : secons;
    return `${minutes}:${secons}`;
  };

  render() {
    const {
      status,
      onToggleDone,
      text,
      createdDate,
      onDelete,
      onEdit,
      onSubmitChange,
      timer,
      onStartTimer,
      onStopTimer
    } = this.props;
    const { value, id } = this.state;
    return (
      <li className={status}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onInput={() => {
              onToggleDone();
            }}
          />
          <label>
            <span className="title">{text}</span>
            {status === 'task' ? (
              <span
                className="description"
                style={{ color: timer > 0 ? 'grey' : 'red' }}
              >
                <button
                  className="icon icon-play"
                  type="button"
                  onClick={onStartTimer}
                  disabled={timer === 0}
                />
                <button
                  className="icon icon-pause"
                  type="button"
                  onClick={onStopTimer}
                />
                {this.renderTime(timer)}
              </span>
            ) : null}
            <span className="created">{formatDistanceToNow(createdDate)}</span>
          </label>
          <button
            className="icon icon-edit"
            type="button"
            onClick={onEdit}
          />
          <button
            className="icon icon-destroy"
            onClick={() => {
              onDelete();
            }}
            type="button"
          />
        </div>
        {status === 'editing' ? (
          <input
            type="text"
            className="edit"
            value={value}
            onChange={(event) => this.setState({ value: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSubmitChange(event.target.value, id);
              }
            }}
          />
        ) : null}
      </li>
    );
  }
}

Task.defaultProps = {
  status: 'task',
  text: 'New Task Text',
  createdDate: Date.now(),
};

Task.propTypes = {
  text: PropTypes.string,
  status: PropTypes.string,
  createdDate: PropTypes.number,
};
