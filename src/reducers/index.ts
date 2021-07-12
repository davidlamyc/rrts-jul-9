import { combineReducers } from 'redux';
import { todosReducer, TodosState } from './todos';

export interface StoreState {
    todos: TodosState
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer
});
