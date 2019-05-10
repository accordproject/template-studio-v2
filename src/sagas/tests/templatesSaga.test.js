// import {pushTemplatesToStore} from './sagas';
// import * as selectors from './selectors';
// import * as api from './api';
// import {recordSaga} from './TestUtils';
// import { loadProfileFailure, loadProfileSuccess } from './actionCreators';

import { pushTemplatesToStore } from '../templatesSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
// import { addNewTemplateAction } from '../../actions/templatesActions';

describe('addNewTemplateToStore', () => {
  //   beforeEach(() => {
  //     jest.resetAllMocks();
  //   });

  it('should fail if not authenticated', async () => {
    const spomething = [{
      type: 'ADD_NEW_TEMPLATE_SUCCEEDED',
      template: {
        uri: `${Date.now()}`,
        name: 'Temporary New Template',
        version: '1.0.0',
        description: 'This is mock data to showcase an action to add a new template.',
      },
    }];
    const dispatched = await recordSaga(
      pushTemplatesToStore,
    );
    expect(dispatched).toContainEqual(spomething);
  });
});
