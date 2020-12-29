import './style.scss';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { IStore, ITodo } from '../../store';
import { useCallback, useRef } from 'react';

interface IColumn {
  header: string;
  status: number;
  color: string;
}

const Column: React.FC<IColumn> = ({ header, status, color }) => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  const todos = useSelector(({ todos }: IStore) => todos).filter(
    (todo: ITodo) => todo.status === status
  );

  const handleDragEnter = () => {
    ref?.current?.classList.add('dragover');
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    ref?.current?.classList.remove('dragover');
  };

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

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    ref?.current?.classList.remove('dragover');
    const todoId = e.dataTransfer.getData('text/plain');
    const todoIdNum = parseInt(todoId);
    handleTransfer(todoIdNum, status);
  };

  return (
    <section
      ref={ref}
      className="col todos-col"
      onDragEnter={() => handleDragEnter()}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={() => handleDragLeave()}
      onDrop={(e) => handleDrop(e)}
    >
      <div className="todos-content">
        <header className="todos-header" style={{ borderColor: color }}>
          <h2>{header}</h2>
        </header>
        {todos.map((todo: ITodo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </section>
  );
};

export default Column;
