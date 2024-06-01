const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
};
function reducer(state, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            if (!state.favorites.includes(action.payload)) {
                const updatedFavoritesAdd = [...state.favorites, action.payload];
                localStorage.setItem('favorites', JSON.stringify(updatedFavoritesAdd));
                return {
                    ...state,
                    favorites: updatedFavoritesAdd
                };
            }
            return state;
        case 'REMOVE_FAVORITE':
            const updatedFavoritesRemove = state.favorites.filter(id => id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(updatedFavoritesRemove));
            return {
                ...state,
                favorites: updatedFavoritesRemove
            };
        default:
            return state;
    }
}
export { initialState, reducer };
