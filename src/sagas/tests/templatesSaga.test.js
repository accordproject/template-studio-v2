import { addNewTemplateToStore, pushTemplatesToStore } from '../templatesSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
import { addNewTemplateSuccess, getTemplatesSuccess } from '../../actions/templatesActions';

describe('pushTemplatesToStore', () => {
  it('should dispatch the action getTemplatesSuccess', async () => {
    const dispatched = await recordSaga(
      pushTemplatesToStore,
      getTemplatesSuccess,
    );
    expect(dispatched[0].type).toEqual('GET_AP_TEMPLATES_SUCEEDED');
  });

  it('should receive an array of templates from accordproject.org', async () => {
    const dispatched = await recordSaga(
      pushTemplatesToStore,
      getTemplatesSuccess,
    );
    expect(dispatched[0].templates[0].url).toContain('templates.accordproject.org');
  });
});

describe('addNewTemplateToStore', () => {
  it('should dispatch the action addNewTemplateSuccess', async () => {
    const dispatched = await recordSaga(
      addNewTemplateToStore,
      addNewTemplateSuccess,
    );
    expect(dispatched[0].type).toEqual('ADD_NEW_TEMPLATE_SUCCEEDED');
  });

  it('should add a template with a stock name', async () => {
    const dispatched = await recordSaga(
      addNewTemplateToStore,
      addNewTemplateSuccess,
    );
    expect(dispatched[0].template.name).toContain('Temporary New Template');
  });
});
