import React from 'react';

const Context = React.createContext({
    data: [],
    totalPages: 0,
    currentPage: 0,
    selectedGif: {},
    currentSlide: 0,
    isLoading: false,
    nextSlide: () => {},
    prevSlide: () => {},
    showLoading: () => {},
    hideLoading: () => {}
});

export default Context;

