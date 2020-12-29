import './style.scss';
import Icon from '@mdi/react';
import {
  mdiTransferLeft,
  mdiTransferRight,
  mdiPencil,
  mdiDelete,
} from '@mdi/js';
import { ITodo } from '../../store';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import Editor from '../Editor';

const Todo: React.FC<ITodo> = ({ id, title, status }) => {
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleTransfer = useCallback(
    (id, status) => {
      dispatch({
        type: 'TRANSFER_TODO',
        id,
        status,
      });
    },
    [dispatch]
  );

  const handleChange = (id: number, title: string) => {
    dispatch({
      type: 'EDIT_TODO',
      id,
      title,
    });
    setIsEdited(false);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch({
        type: 'DELETE_TODO',
        id,
      });
    },
    [dispatch]
  );

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData('text/plain', String(id));
  };

  return (
    <article className="todo-content" draggable onDragStart={handleDragStart}>
      <p>
        {isEdited ? (
          <Editor
            initialValue={title}
            handleChange={(newTitle: string) => handleChange(id, newTitle)}
          />
        ) : (
          title
        )}
      </p>
      <div className="todo-icons">
        {status !== 0 && (
          <button
            title="Move left"
            onClick={() => handleTransfer(id, --status)}
          >
            <Icon path={mdiTransferLeft} size={1} color="#ccc" />
          </button>
        )}
        {status !== 2 && (
          <button
            title="Move right"
            onClick={() => handleTransfer(id, ++status)}
          >
            <Icon path={mdiTransferRight} size={1} color="#ccc" />
          </button>
        )}
        <button
          title="Edit"
          onClick={() => setIsEdited((prevValue) => !prevValue)}
        >
          <Icon path={mdiPencil} size={1} color="#ccc" />
        </button>
        <button title="Delete" onClick={() => handleDelete(id)}>
          <Icon path={mdiDelete} size={1} color="#ccc" />
        </button>
      </div>
    </article>
  );
};

export default Todo;
