const initialState = {
  modelFiles: {
    'test.cto': `
/**
 * This is a comment
 */
   
namespace test

asset Vehicle identified by vin {
  o String vin default="unknown"
}

// this is another comment
participant Person identified by ssn {
  o String name
  o String ssn
  o DateTime dob
  --> Vehicle vehicle
}`,
  },
  modelManager: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MODEL_FILE_SUCCEEDED':
      return { ...state, modelFiles: { ...state.modelFiles, ...action.modelFile } };
    case 'UPDATE_MODEL_MANAGER_SUCCEEDED':
      return { ...state, modelManager: action.modelManager };
    case 'UPDATE_MODEL_ERROR_SUCCEEDED':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
