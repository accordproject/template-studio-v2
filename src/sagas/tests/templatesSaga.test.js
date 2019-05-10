import { pushTemplatesToStore } from '../templatesSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
import { getTemplatesSuccess } from '../../actions/templatesActions';

describe('pushTemplatesToStore', () => {
  //   beforeEach(() => {
  //     jest.resetAllMocks();
  //   });

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
