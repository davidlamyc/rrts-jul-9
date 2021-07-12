import { FetchTodosSuccess, DeleteTodoAction, FetchTodosRequest, FetchTodosFailure } from './todos';

export enum ActionTypes {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    deleteTodo
}

export type Action = 
FetchTodosRequest | 
FetchTodosSuccess |
FetchTodosFailure | 
DeleteTodoAction ;