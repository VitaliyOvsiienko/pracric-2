import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {

  state = {
    name: '',
  }
  handleChange = (e) => {
    const {value} = e.target
    this.setState({ name: value });
    console.log(this.state.name);
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.name);

  }
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
  <FormBtn type="submit">
    <FiSearch size="16px" />
  </FormBtn>
  <InputSearch
    placeholder="What do you want to write?"
    name="search"
    required
          autoFocus
          value={this.state.name}
          onChange={this.handleChange}
  />
</SearchFormStyled>
    )
  }
}
