import React, { Component } from 'react';
import './App.css';
import Header from './components/common/Header';
import SearchForm from './components/SearchForm';
import { searchGifs } from './api/GifApi';
import Gif from './components/Gif';
import Lightbox from './components/LightBox';
import Context from './Context';
import Loading from './components/common/Loading';
import SearchButton from './components/SearchForm/SearchButton';


class App extends Component {

  state = {
    data: [], showLightbox: false, selectedGif: {},
    totalItems: 0, isLoading: false, searchParam: '',
    errorMsg: ''
  };

  handleInputChange = event => {
    this.setState({ searchParam: event.target.value });
    if (this.state.errorMsg) {
      this.setState({ errorMsg: '' });
    }
  }

  doSearch = newSearch => {
    this.showLoading();
    let offset = newSearch ? 0 : this.state.data.length;

    let { searchParam } = this.state;

    if (!searchParam) {
      this.setState({ errorMsg: 'Debe introducir algun parametro de busqueda' });
      this.hideLoading();
      return;
    }

    searchGifs(searchParam, 12, offset).then(resp => {
      let data = [];
      if (newSearch) {
        data = resp.data;
      } else {
        data = [...this.state.data, ...resp.data];
      }
      console.log(data);
      this.setState({ data, totalItems: resp.pagination.total_count });
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.hideLoading();
    })

  }


  onGifSelect = (gif, index) => {
    this.setState({ currentSlide: index, showLightbox: true, selectedGif: gif });
  }

  renderResults = () => {
    const { data } = this.state;

    if (data.length < 1) return <div></div>;

    return (
      data.map((gif, index) => {
        return (
          <Gif key={gif.id} src={gif.images.fixed_height.url} onClick={this.onGifSelect.bind(this, gif, index)} />
        )
      })
    )
  }

  closeLightbox = () => {
    this.setState({ showLightbox: false });
  }

  nextSlide = () => {
    const { currentSlide, data } = this.state;
    let next = 0;

    if (currentSlide < data.length - 1) {
      next = currentSlide + 1;
    }

    this.setState({ currentSlide: next, selectedGif: data[next] });
  }

  prevSlide = () => {
    const { currentSlide, data } = this.state;

    let next = currentSlide - 1;

    if (currentSlide === 0) {
      next = data.length - 1;
    }

    this.setState({ currentSlide: next, selectedGif: data[next] });
  }

  renderLightbox = () => {
    if (!this.state.showLightbox) {
      return <div></div>;
    }

    return <Lightbox closeLightbox={this.closeLightbox} data={this.state.data} slideNumber={this.state.currentSlide} />;
  }

  showLoading = () => {
    this.setState({ isLoading: true });
  }

  hideLoading = () => {
    this.setState({ isLoading: false });
  }

  renderLoading = () => {
    if (this.state.isLoading) {
      return <Loading />
    }

    return null;
  }

  renderLoadMoreButton = () => {
    if (this.state.data.length) {
      return (
        <div>
          <SearchButton onClick={this.doSearch.bind(this, false)} text="Cargar mas" />
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <Context.Provider
        value={{
          data: this.state.data,
          selectedGif: this.state.selectedGif,
          currentSlide: this.state.currentSlide,
          prevSlide: this.prevSlide,
          nextSlide: this.nextSlide,
          showLoading: this.showLoading,
          hideLoading: this.hideLoading,
          isLoading: this.state.isLoading
        }}
      >
        <div className="App">
          <Header headerText="Búsqueda de Gifs" />
          <SearchForm buttonText="Buscar"
            searchParam={this.state.searchParam}
            handleInputChange={this.handleInputChange}
            doSearch={this.doSearch.bind(this, true)}
          />
          <div>
            <h3 style={{ color: 'red' }}>{this.state.errorMsg}</h3>
          </div>
          <div className="search-results">
            {this.renderResults()}
          </div>
          <div className="lightbox">
            {this.renderLightbox()}
          </div>

          {this.renderLoadMoreButton()}

          {this.renderLoading()}
        </div>
      </Context.Provider>

    );
  }
}

export default App;
