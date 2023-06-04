import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isEmpty: false,
    isLoading: false,
    isShowButton: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  handleSubmitQuery = name => {
    this.setState({ query: name, images: [], isEmpty: false, page: 1 });
  };

  handleClickButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const {
        photos,
        total_results,
        per_page,
        page: currentPage,
      } = await ImageService.getImages(query, page);
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
        return;
      }
      this.setState(({ images }) => ({
        images: [...images, ...photos],
        isShowButton: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isEmpty, isLoading, isShowButton, error } = this.state;
    const isShowImages = images.length > 0;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmitQuery} />
        {isShowImages && (
          <Grid>
            {images.map(({ src: { medium }, alt, id }) => {
              return (
                <GridItem key={id}>
                  <CardItem>
                    <img src={medium} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
          </Grid>
        )}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <Text textAlign="center">Loading ...</Text>}
        {isShowButton && (
          <Button type="button" onClick={this.handleClickButton}>
            Load more
          </Button>
        )}
        {error && <Text textAlign="center">{error}</Text>}
      </>
    );
  }
}
