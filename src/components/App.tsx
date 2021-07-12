import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { todosReducer, TodosState } from '../reducers/todos';
import { StoreState } from '../reducers';

interface AppProps {
    todos: TodosState;
    fetchTodos: Function
    deleteTodo: typeof deleteTodo
}

class _App extends React.Component<AppProps> {
    onButtonClick = (): void => {
        this.props.fetchTodos();
    }

    onTodoClick = (id: number): void => {
        this.props.deleteTodo(id);
    };

    renderList(): JSX.Element[] {
        return this.props.todos.todos.map((todo: Todo) => {
          return (
              <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
                {todo.title} | {todo.username}
              </div>
          );
        });
    }

    renderLoader(): JSX.Element | null {
        return this.props.todos.isFetching ? <p>Loading....</p> : null;
    }

    renderError(): JSX.Element | null {
        return this.props.todos.error ? <p>{this.props.todos.error}</p> : null;
    }

    render() {
        return <div>
            <button onClick={this.onButtonClick}>Fetch Todos</button>
            {this.renderLoader()}
            {this.renderError()}
            {this.renderList()}
        </div>
    }
}

const mapStateToProps = ({ todos }: StoreState): { todos: TodosState } => {
    return { todos };
}

export const App = connect (
    mapStateToProps,
    { fetchTodos, deleteTodo }
)(_App);