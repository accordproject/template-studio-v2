import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { ModelManager } from 'composer-concerto';
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
    const state = {
      modelState: {
        modelFiles
      }
    };
    const modelManager = new ModelManager();
    Object.keys(modelFiles).forEach((fileName) => {
      modelManager.addModelFile(modelFiles[fileName], fileName, true);
    });
    modelManager.updateExternalModels();
    modelManager.validateModelFiles();

    expectSaga(validateModelFiles)
      .withState(state)
      .provide([[select(state => state['test.cto']), modelFiles]])
      .put(updateModelManagerSuccess(modelManager))
      .run();
  });
});
