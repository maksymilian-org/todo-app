import React, { useEffect } from 'react';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './App.scss';
import Column from './components/Column';
import Form from './components/Form';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const store = useSelector((state) => state);

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Todo App</h1>
      </header>
      <main className="app-main">
        <div className="container">
          <Form />
          <div className="row">
            <Column header="Todo" status={0} color="#75c0e0" />
            <Column header="In progress" status={1} color="#fecf6a" />
            <Column header="Complete" status={2} color="#82caaf" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
