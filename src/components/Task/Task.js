import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default function Task(props) {
  const { status, onToggleDone, text, createdDate, onDelete } = props;
  return (
    <li className={status}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onInput={onToggleDone}
        />
        <label>
          <span className="description">{text}</span>
          <span className="created">{formatDistanceToNow(createdDate)}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
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
          value={text}
        />
      ) : null}
    </li>
  );
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
