import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';

const Form: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', title: value });
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Type a new todo"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default Form;
