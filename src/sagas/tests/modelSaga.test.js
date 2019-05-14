import { select } from 'redux-saga/effects';
import { updateModelFileOnStore, validateModelFiles } from '../modelSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
import { updateModelFileSuccess, updateModelManagerSuccess } from '../../actions/modelActions';
import * as selectors from '../../selectors/modelSelectors';

describe('updateModelFileOnStore', () => {
  it('should dispatch the action updateModelFileSuccess', async () => {
    const dispatched = await recordSaga(
      updateModelFileOnStore,
      updateModelFileSuccess,
    );
    expect(dispatched[0].type).toEqual('UPDATE_MODEL_FILE_SUCCEEDED');
  });
});

describe('validateModelFiles', () => {
  it('first yield resolves to the model selector', async () => {
    const modelFilesSelected = select(selectors.modelFiles);
    const firstYield = validateModelFiles().next().value;
    expect(firstYield).toEqual(modelFilesSelected);
  });

  it('should complete successful update to model manager', async () => {
    const modelFiles = {
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
    };
    const state = { modelState: modelFiles };
    const dispatched = await recordSaga(
      validateModelFiles,
      updateModelManagerSuccess,
      state
    );
    expect(dispatched[0].error.fileName).toEqual('test.cto');
  });
});
