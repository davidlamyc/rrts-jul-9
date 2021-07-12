import { Todo, Action, ActionTypes } from '../actions';

export interface TodosState {
    isFetching: boolean,
    todos: Todo[]
    error?: string
}

const todosInitialState = {
    isFetching: false,
    todos: [],
    error: ''
}

export const todosReducer = (state: TodosState = todosInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchTodosRequest:
            return { ...state, isFetching: true };
        case ActionTypes.fetchTodosSuccess:
            return { ...state, isFetching: false, todos: action.payload };
        case ActionTypes.fetchTodosFailure:
            return { ...state, isFetching: false, todos: [], error: action.error };
        case ActionTypes.deleteTodo:
            const filteredTodos = (state.todos || []).filter((todo: Todo) => todo.id !== action.payload);
            return { ...state, isFetching: false, todos: filteredTodos };
        default:
            return state;
    }
}