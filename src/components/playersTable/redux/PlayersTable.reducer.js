const initialState = {
  title: 'Hola Titulo',
  players: []
};

const TestReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TEST':
      return { ...state };

    case 'FETCH_DATA_SUCCESS':
      return { ...state, players: action.payload };

    default:
      return state;
  }
}

export default TestReducer;