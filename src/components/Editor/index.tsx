import { useEffect, useRef, useState } from 'react';
import './style.scss';

interface IEditor {
  initialValue: string;
  handleChange: (newTitle: string) => void;
}

const Editor: React.FC<IEditor> = ({ initialValue, handleChange }) => {
  const [value, setValue] = useState<string>(initialValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <input
      className="todo-editor"
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => handleChange(e.target.value)}
    />
  );
};

export default Editor;
