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
        case 'START_SEARCH':
            return {
                ...state,
                searchTitle: payload
            }
        case 'CLEAR_SEARCH':
            return {
                ...state,
                searchTitle: ''
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: payload
            }
        case 'CHANGE_PAGE_BY':
            return {
                ...state,
                pageChangedByApp: payload
            }
        default: {
            return state;
        }
    }
}