export default function reducer(state, { type, payload }) {
    switch (type) {
        case 'SELECT_MOVIE':
            return {
                ...state,
                selectedMovieId: payload
            }
        case 'IS_SMALL_SCREEN':
            return {
                ...state,
                isSmallScreen: payload
            }
        case 'SHOW_SIDEBAR':
            return {
                ...state,
                isSideBarOpen: payload
            }
        default: {
            return state;
        }
    }
}