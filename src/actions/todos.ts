import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    username?: number
}

export interface User {
    id: number;
    name: string,
    username: string,
    email: string,
}

export interface FetchTodosRequest {
    type: ActionTypes.fetchTodosRequest;
}

export interface FetchTodosSuccess {
    type: ActionTypes.fetchTodosSuccess;
    payload: Todo[];
}

export interface FetchTodosFailure {
    type: ActionTypes.fetchTodosFailure;
    error: string;
}

export interface DeleteTodoAction {
    type: ActionTypes.deleteTodo,
    payload: number;
}

const getTodosUrl ='https://jsonplaceholder.typicode.com/todos';
const getUsersUrl ='https://jsonplaceholder.typicode.com/users';

export const fetchTodos = () => {
    return async (dispatch: Dispatch) => {
        dispatch<FetchTodosRequest>({ type: ActionTypes.fetchTodosRequest });

        try {
            const todoResponse : AxiosResponse = await axios.get<Todo[]>(getTodosUrl);
            const usersResponse : AxiosResponse = await axios.get<User[]>(getUsersUrl);

            const todosWithUser: any = [];

            todoResponse.data.forEach((t: any) => {
                usersResponse.data.forEach((u: any) => {
                    let todoWithUser;
                    if (t.userId === u.id) {
                        todoWithUser = {
                            ...t,
                            username: u.username
                        }
                        todosWithUser.push(todoWithUser)
                    }
                })
            })
        
            dispatch<FetchTodosSuccess>({
                type: ActionTypes.fetchTodosSuccess,
                payload: todosWithUser
            });
        } catch (error) {
            console.log(error.message)
            dispatch<FetchTodosFailure>({
                type: ActionTypes.fetchTodosFailure,
                error: error.message
            });
        }
    };
};

// no api call, so thunk not used
export const deleteTodo = (id: number): DeleteTodoAction => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id
    }
};