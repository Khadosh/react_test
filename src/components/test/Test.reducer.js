const initialState = {
  title: 'Hola Titulo'
};

const TestReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TEST':
      return { ...state };

    default:
      return state;
  }
}

export default TestReducer;