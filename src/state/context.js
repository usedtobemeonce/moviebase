import { createContext } from 'react';

const Context = createContext({
    isAuth: false,
    isSmallScreen: false,
    isSideBarOpen: false,
    currentUser: null,
    searchTitle: '',
    selectedMovieId: null,
    selectedMovie: null,
    page: "1",
    pageChangedByApp: false,
});

export default Context;