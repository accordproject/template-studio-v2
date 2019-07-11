import {
  UPDATE_MODEL_ERROR_SUCCEEDED,
  UPDATE_MODEL_MANAGER_SUCCEEDED,
} from '../actions/constants';

const initialState = {
  modelManager: null,
  error: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODEL_MANAGER_SUCCEEDED:
      return { ...state, modelManager: action.modelManager };
    case UPDATE_MODEL_ERROR_SUCCEEDED:
      return { ...state, error: [...state.error, action.error] };
    default:
      return state;
  }
};

export default reducer;
