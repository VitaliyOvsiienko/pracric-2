import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page:1
  }

  componentDidUpdate(prevProps, prevState) {
    const {query, page}=this.state
    if (prevState.query !== query) {
      this.getPhotos(query, page)
   }
   console.log(this.state)
 }



  handleSubmitQuery = (name) => {
    this.setState({ query: name })
  }

  getPhotos = async(query, page) => {
    const {photos} = await ImageService.getImages(query, page);
    
    this.setState(({ images }) => ({ images: [...images, ...photos] }))
    
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={ this.handleSubmitQuery} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
