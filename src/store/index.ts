export interface ITodo {
  id: number;
  title: string;
  status: number;
}

export interface IStore {
  todos: ITodo[];
  nextId: number;
}

interface IAction {
  type: string;
  id: number;
  title: string;
  status: number;
}

const initialState = JSON.parse(localStorage.getItem('store') || 'null') || {
  todos: [
    {
      id: 0,
      title: 'Reading a book',
      status: 0,
    },
    {
      id: 1,
      title: 'Washing dishes',
      status: 0,
    },
    {
      id: 2,
      title: 'Write a letter',
      status: 1,
    },
  ],
  nextId: 3,
};

const reducer = (state: IStore = initialState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      const { title } = action;
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, title, status: 0 }],
        nextId: ++state.nextId,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, title: action.title } : { ...todo }
        ),
      };
    case 'TRANSFER_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, status: action.status }
            : { ...todo }
        ),
      };
    default:
      return state;
  }
};

export default reducer;
