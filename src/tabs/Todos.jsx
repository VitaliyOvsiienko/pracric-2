import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const key = 'todos';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount = () => {
    const items = localStorage.getItem(key);

    if (items) {
      this.setState({ todos: JSON.parse(items) });
    }
  };

  componentDidUpdate(_, prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      localStorage.setItem(key, JSON.stringify(todos));
    }
  }

  addTodo = text => {
    const todo = {
      text,
      id: nanoid(),
    };

    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
    console.log(this.state);
  };

  render() {
    const { todos } = this.state;
    console.log(todos);
    return (
      <>
        <SearchForm onSubmit={this.addTodo} />
        <Grid>
          {todos.map(({ text, id }) => {
            return (
              <GridItem key={id}>
                <Todo text={text} />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
