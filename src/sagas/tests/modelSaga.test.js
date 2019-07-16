import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { APModelManager } from '@accordproject/ergo-compiler';
import { validateClauseModelFiles } from '../modelSaga';
import { updateModelManagerSuccess } from '../../actions/modelActions';
import * as clauseTemplateSelectors from '../../selectors/clauseTemplateSelectors';

describe('validateClauseModelFiles', () => {
  it('first yield resolves to the clause template selector', async () => {
    const clauseTemplatesSelected = select(clauseTemplateSelectors.clauseTemplates);
    const firstYield = validateClauseModelFiles({ clauseTemplateId: 'clauseTempId', fileName: 'model.cto' }).next().value;
    expect(firstYield).toEqual(clauseTemplatesSelected);
  });

  it('should complete successful update to model manager', async () => {
    const modelFiles = [{
      name: 'model.cto',
      content: `
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
    }];
    const state = {
      clauseTemplatesState: {
        clauseTempId: {
          model: modelFiles
        }
      }
    };
    const modelManager = new APModelManager();
    modelFiles.forEach((file) => {
      modelManager.addModelFile(file.content, file.name, true);
    });
    modelManager.updateExternalModels();
    modelManager.validateModelFiles();

    return expectSaga(validateClauseModelFiles, { clauseTemplateId: 'clauseTempId', fileName: 'model.cto' })
      .withState(state)
      .put(updateModelManagerSuccess(modelManager))
      .run();
  });
});
