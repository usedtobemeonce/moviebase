import { createContext } from 'react';

const Context = createContext({
    isAuth: false,
    currentUser: null,
    selectedMovieId: null,
    selectedMovie: null,
});

export default Context;