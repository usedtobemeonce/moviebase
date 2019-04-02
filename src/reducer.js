export default function reducer(state, { type, payload }) {
    switch (type) {
        case 'SELECT_MOVIE':
            return {
                ...state,
                selectedMovieId: payload
            }
        default: {
            return state;
        }
    }
}